import {Router} from 'express';
import axios from 'axios';
import * as parser from 'xml2json';
import { extractDependencies } from './utils/pom';
import { getAccessToken, getUserProfile, getUserRepos, initiateGithubLogin } from './controllers/auth';
import { verifyJWT } from './utils/auth';


const router = Router();

router.get('/', (req, res) => { 
  console.log('Hello from Express Router');
  res.status(200).json({ message: 'Hello from Express Router' });
});

/**
 *  Login Verify API begins here
*/
router.get('/auth/verify', (req, res) => {
  const cookies = req.cookies;  // Access cookies from the request object
  console.log("cookies: ", cookies);       // Log or process the cookies
  const jwt = cookies.jwt;
  let isLoggedIn = false;
  if (jwt) {
    isLoggedIn = true;
  }

  res.status(200).json({ isLoggedIn: isLoggedIn });
});

/**
 * Login Verify API ends here
 */


// GitHub OAuth endpoint
router.get('/github/auth', initiateGithubLogin);
router.post('/github/token', getAccessToken)
router.get('/repos', getUserRepos);
// router.get('/github/profile', protect, getUserProfile);
router.get('/github/profile', getUserProfile);


// Step 1: Fetch all repositories
interface GitHubRepo {
  name: string;
  owner: {
    login: string;
  };
}


// Step 3: Select one repository
// Step 4: Fetch contents of all pom.xml files
router.get('/dependencies', async (req, res) => {
  const { reponame, username } = req.query;
  console.log('reponame', reponame);
  console.log('username', username);

  // const accessToken = req.headers.authorization?.replace('Bearer ', ''); // Extract token from the request headers
  const accessToken = verifyJWT(req.cookies.jwt);

  try {
    // Step 3: Retrieve the contents of all pom.xml files in the repository
    const pomFiles = await getAllPomFiles(reponame as string, accessToken, username as string);
    const parsedJson = [];

    // Step 4: Parse and print dependencies for each pom.xml file
    for (const pomFile of pomFiles) {
      // console.log('Parsing', pomFile);
      // console.log('pomContent0', pomFile.content);
      if (pomFile.content) {
        const json = parser.toJson(pomFile.content);
        parsedJson.push(JSON.parse(json));
        // console.log('pomContent1', json);
        // parsePomContent(pomFile.content);
      } else {
        console.error('Error: pomFile.content is undefined for', pomFile.path);
      }
    }

    const dependencies =  extractDependencies(parsedJson);
    // const dependenciesMap = extractDependencies(parsedJson);
    // console.log(dependenciesMap);

    res.status(200).json({ data: dependencies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error fetching pom.xml files' });
  }
});


// Helper function to get all pom.xml files in a repository recursively
const getAllPomFiles = async (repo: string, accessToken: string | undefined, username: string, path = ''): Promise<any[]> => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!Array.isArray(response.data) || response.data.length === 0) {
      console.error('Invalid response from GitHub API:', response.data);
      return [];
    }

    const allFiles = response.data.filter(
      (file: any) => file.type === 'file' && file.name === 'pom.xml'
    );

    const subDirectories = response.data.filter((file: any) => file.type === 'dir');

    const filesInSubDirectories = await Promise.all(
      subDirectories.map(async (subDir: any) => {
        return getAllPomFiles(repo, accessToken, username, `${path}/${subDir.name}`);
      })
    );

    const filesWithContent = await Promise.all(
      allFiles.map(async (file: any) => {
        try {
          const contentResponse = await axios.get(file.download_url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return { ...file, content: contentResponse.data };
        } catch (contentError) {
          console.error(`Error fetching content for ${file.path}`);
          return { ...file, content: undefined };
        }
      })
    );

    return filesWithContent.concat(...filesInSubDirectories);
  } catch (error) {
    console.error('Error fetching files:');
    return [];
  }
};


export default router;
