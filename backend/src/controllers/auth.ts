import axios from "axios";
import { createJWT, verifyJWT } from "../utils/auth";

const CLIENT_ID = process.env.CLIENT_ID; // GitHub OAuth app client id
const CLIENT_SECRET = process.env.CLIENT_SECRET; // GitHub OAuth app client secret

export const initiateGithubLogin = (req, res) => {
  // https://stackoverflow.com/questions/69623907/github-oauth2-token-how-to-restrict-access-to-read-private-repo
  // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps

  // Redirect the user to the GitHub OAuth screen
  const REDIRECT_URI = 'http://localhost:3000';
  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
  res.redirect(githubOAuthUrl);
  // res.redirect(307, githubOAuthUrl);
};

export const getAccessToken = async (req, res) => {
  console.log(req.body)
  try {
    const { code } = req.body;
    console.log(code)
    if (!code) {
      console.log("here code")
      return res.status(400).json({ error: "Missing authorization code" });
    }

    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    console.log(response)

    console.log("here1")
    const { access_token } = response.data;

    // Create a JWT with the GitHub access code
    const token = createJWT(access_token);

    console.log("here2")

    // Set the JWT as a cookie
    res.cookie("jwt", token, { httpOnly: true, sameSite: 'Strict', expires: new Date(Date.now() + 9999999) });
    console.log("here3")

    res.status(200).json({ message: "successfully got the token and stored in cookies!" });
    console.log("here4")
    // res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/*export const githubAuth = async (req, res) => {
  const { code } = req.query;
  if (!code) {
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
    res.redirect(githubOAuthUrl);
  }

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const { access_token } = response.data;

    // Create a JWT with the GitHub access code
    const token = createJWT(access_token);

    // Set the JWT as a cookie
    res.cookie("jwt", token, { httpOnly: true });

    res
      .status(200)
      .json({ message: "GitHub access code stored in JWT cookie." })
      .redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error getting access token:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}; */

export const getUserRepos = async (req, res) => {
  const accessToken = verifyJWT(req.cookies.jwt);
  // ToDo: Add pagination in the below code and also do the same changes in the frontend
  let page = 1, per_page = 100;
  try {
    const response = await axios.get(`https://api.github.com/user/repos?per_page=${per_page}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const repos = response.data;
    res.status(200).json({ data: repos });
  }
  catch (error) {
    console.error("Error getting user repos:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  // const accessToken = req.headers.authorization?.replace('Bearer ', '');
  const accessToken = verifyJWT(req.cookies.jwt);
  console.log("accessToken in getUserProfile", accessToken)

  try {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;

    res.json({ data });
  } catch (error) {
    res.status(400).json({ error: "Error while fetching the user profile" });
    // res.status(400).json({ error: error.message });
  }
};
