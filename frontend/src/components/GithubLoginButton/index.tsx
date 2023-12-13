const handleClick = () => {
  console.log("Button clicked")
  console.log(document.cookie)
  // Redirect the user to the GitHub OAuth screen
  window.location.href = "http://localhost:3001/api/github/auth";
}

/*
router.get('/github/auth', initiateGithubLogin);
router.get('/github/token', getAccessToken)
router.get('/repos', protect, getUserRepos);
router.get('/github/profile', protect, getUserProfile);
*/

export const GithubLoginButton = () => {
  console.log("Render count in src/GithubLoginButton/index.tsx: ", window.renderCount++)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <button
          className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          onClick={handleClick}>
          Log in with Github
        </button>
      </div>
    </div>
  )
};

/**
 * const profileData = {
  data: {
    login: "jkrlr",
    id: 63921263,
    node_id: "MDQ6VXNlcjYzOTIxMjYz",
    avatar_url: "https://avatars.githubusercontent.com/u/63921263?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/jkrlr",
    html_url: "https://github.com/jkrlr",
    followers_url: "https://api.github.com/users/jkrlr/followers",
    following_url: "https://api.github.com/users/jkrlr/following{/other_user}",
    gists_url: "https://api.github.com/users/jkrlr/gists{/gist_id}",
    starred_url: "https://api.github.com/users/jkrlr/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/jkrlr/subscriptions",
    organizations_url: "https://api.github.com/users/jkrlr/orgs",
    repos_url: "https://api.github.com/users/jkrlr/repos",
    events_url: "https://api.github.com/users/jkrlr/events{/privacy}",
    received_events_url: "https://api.github.com/users/jkrlr/received_events",
    type: "User",
    site_admin: false,
    name: "Jitendra Kumar",
    company: "Ex @amzn",
    blog: "",
    location: "Bulandshahr, India",
    email: null,
    hireable: true,
    bio: null,
    twitter_username: "jkrlr01",
    public_repos: 32,
    public_gists: 0,
    followers: 8,
    following: 13,
    created_at: "2020-04-18T16:41:38Z",
    updated_at: "2023-11-30T15:55:41Z",
  },
};


const logout = () => {
  // Clear the JWT token from cookies
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to the login page or update the UI as needed
  // Example: Redirecting to the login page using React Router
  // history.push('/login');
}
 */