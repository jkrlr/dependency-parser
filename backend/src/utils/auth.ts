import jwt from 'jsonwebtoken'
import axios from 'axios'

export const getGitHubUser = async ({ code }: { code: string }) => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const githubToken = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
      )
      .then((res) => res.data)
  
      .catch((error) => {
        throw error;
      });
  
    const {access_token} = githubToken.access_token;
  
  
    return axios
      .get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Error getting user from GitHub`);
        throw error;
      });
  }

export const createJWT = (access_token: string) => {
  const token = jwt.sign(
    {
      access_token: access_token,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = decoded.access_token;
    return accessToken;
  } catch (error) {
    // Log the specific error for troubleshooting
    console.error("JWT verification error:", error.message);
    return null;
  }
};

export const protect = (req, res, next) => {
    // Retrieve the JWT from the cookie
  const token = req.cookies.jwt;
  console.log("token", token)
    if (!token) {
        res.status(401)
        res.json({ message: "You need to be logged in to visit this route" })
        return
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log("decoded", decoded)
      const accessToken = decoded.access_token;
      req.access_token = accessToken;
      console.log("accessToken", accessToken)
      next()
    }
    catch (e) {
        console.log(e)
        res.status(401)
        res.json({ message: "Invalid token" })
        return
    }
}