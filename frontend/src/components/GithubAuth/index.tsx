import React, { useEffect, useState } from "react";
import { GithubLoginButton } from "../GithubLoginButton";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../Spinner";

const profileData = {
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

export const GithubAuth = () => {
  console.log(
    "Render count in src/GithubAuth/index.tsx: ",
    window.renderCount++,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [profile, setProfile] = useState(profileData.data); // replace profileData.data with null, and add chaining operation in jsx like profile?.avatar_url
  const [loading, setLoading] = useState(true);

  // ToDO: Add error handling cases for no-internet and when user drops in between the auth flow

  useEffect(() => {
    console.log("useEffect called");

    async function checkIsLoggedIn() {
      console.log("checkIsLoggedIn called");
      const response = await axios.get(
        "http://localhost:3001/api/auth/verify",
        { withCredentials: true },
      );
      const data = response.data;
      setIsLoggedIn(data.isLoggedIn);
    }

    checkIsLoggedIn();

    const code = searchParams.get("code");
    console.log("code: ", code);

    async function getAccessToken() {
      console.log("getAccessToken called");
      const response = await axios.post(
        "http://localhost:3001/api/github/token",
        { code: code },
        { withCredentials: true },
      );
      const data = response.data;
      console.log("getAccessToken's data: ", data);
    }

    if (!isLoggedIn && code) {
      getAccessToken();
      setSearchParams();
      setIsLoggedIn(true);
    }

    async function getProfile() {
      console.log("getProfile called");
      const response = await axios.get(
        "http://localhost:3001/api/github/profile",
        { withCredentials: true },
      );
      const data = response.data;
      console.log("getProfile's data: ", data);
      setProfile(data.data);
      setLoading(false);
    }

    if (isLoggedIn) {
      getProfile();
    }
  }, [isLoggedIn]);

  return isLoggedIn ? (
    loading ? (
      <Spinner />
    ) : (
      <div className="relative mx-auto mb-6 mt-20 w-full min-w-0 max-w-md break-words rounded-xl border-2 bg-white shadow-lg md:max-w-2xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="flex w-full justify-center">
              <div className="relative">
                <img
                  className="absolute -m-16 -ml-20 max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                  src={profile.avatar_url}
                  alt="Profile"
                />
              </div>
            </div>
            <div className="mt-20 w-full text-center">
              <div className="flex justify-center pb-0 pt-8 lg:pt-4">
                <div className="p-3 text-center">
                  <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                    {profile.followers}
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                    {profile.following}
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
              {profile.name}
            </h3>
            <div className="mb-2 mt-0 text-xs font-bold uppercase text-slate-400">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {profile.location}
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 py-6 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="mb-4 font-light leading-relaxed text-slate-600">
                  {profile.bio}
                </p>
                <Link
                  to="/repos"
                  className="rounded-md bg-indigo-600 p-2 font-normal text-white hover:border-2 hover:border-emerald-200 hover:bg-white hover:text-indigo-600"
                >
                  View Repos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <GithubLoginButton />
  );
};
