import axios from "axios";

export const checkAuthentication = async () => {
  try {
    // Make a request to the server to verify the JWT
    const response = await axios.get("http://localhost:3001/api/auth/verify", {
      withCredentials: true, // Include cookies
    });

    return response.data.isAuthenticated; // Adjust based on your server response
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    return false;
  }
};

export const getProfile = async (code: string) => {
  try {
    /* {withCredentials: true, credentials: 'include'}
      this should be the third argument in axios.post() and second argument in axios.get() */
    const response = await axios.post(
      "http://localhost:3001/api/github/token",
      {
        code: code,
      },
      {
        withCredentials: true, // Include cookies
      }
    );
    return response;
  } catch (error) {
    console.error("Error getProfile\n", error.message);
    return null;
  }
};
