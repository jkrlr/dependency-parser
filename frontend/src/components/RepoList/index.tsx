import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InputSearchBox from "../InputSearchBox";
import axios from "axios";

const repoData = [
  {
    id: 353034665,
    node_id: "MDEwOlJlcG9zaXRvcnkzNTMwMzQ2NjU=",
    name: "audio-visualizer",
    full_name: "jkrlr/audio-visualizer",
    private: false,
    owner: {
      login: "jkrlr",
      id: 63921263,
      node_id: "MDQ6VXNlcjYzOTIxMjYz",
      avatar_url: "https://avatars.githubusercontent.com/u/63921263?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/jkrlr",
      html_url: "https://github.com/jkrlr",
      followers_url: "https://api.github.com/users/jkrlr/followers",
      following_url:
        "https://api.github.com/users/jkrlr/following{/other_user}",
      gists_url: "https://api.github.com/users/jkrlr/gists{/gist_id}",
      starred_url: "https://api.github.com/users/jkrlr/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/jkrlr/subscriptions",
      organizations_url: "https://api.github.com/users/jkrlr/orgs",
      repos_url: "https://api.github.com/users/jkrlr/repos",
      events_url: "https://api.github.com/users/jkrlr/events{/privacy}",
      received_events_url: "https://api.github.com/users/jkrlr/received_events",
      type: "User",
      site_admin: false,
    },
    html_url: "https://github.com/jkrlr/audio-visualizer",
    description: "Audio Visualizer",
    fork: false,
    url: "https://api.github.com/repos/jkrlr/audio-visualizer",
    forks_url: "https://api.github.com/repos/jkrlr/audio-visualizer/forks",
    keys_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/jkrlr/audio-visualizer/teams",
    hooks_url: "https://api.github.com/repos/jkrlr/audio-visualizer/hooks",
    issue_events_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/issues/events{/number}",
    events_url: "https://api.github.com/repos/jkrlr/audio-visualizer/events",
    assignees_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/branches{/branch}",
    tags_url: "https://api.github.com/repos/jkrlr/audio-visualizer/tags",
    blobs_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/languages",
    stargazers_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/stargazers",
    contributors_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/contributors",
    subscribers_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/subscribers",
    subscription_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/subscription",
    commits_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/jkrlr/audio-visualizer/merges",
    archive_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/downloads",
    issues_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/labels{/name}",
    releases_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/jkrlr/audio-visualizer/deployments",
    created_at: "2021-03-30T14:41:01Z",
    updated_at: "2021-03-30T14:47:50Z",
    pushed_at: "2021-03-30T14:47:48Z",
    git_url: "git://github.com/jkrlr/audio-visualizer.git",
    ssh_url: "git@github.com:jkrlr/audio-visualizer.git",
    clone_url: "https://github.com/jkrlr/audio-visualizer.git",
    svn_url: "https://github.com/jkrlr/audio-visualizer",
    homepage: null,
    size: 2,
    stargazers_count: 0,
    watchers_count: 0,
    language: "Python",
    has_issues: true,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
  },
  {
    id: 345862157,
    node_id: "MDEwOlJlcG9zaXRvcnkzNDU4NjIxNTc=",
    name: "Awesome-JavaScript-Projects",
    full_name: "jkrlr/Awesome-JavaScript-Projects",
    private: false,
    owner: {
      login: "jkrlr",
      id: 63921263,
      node_id: "MDQ6VXNlcjYzOTIxMjYz",
      avatar_url: "https://avatars.githubusercontent.com/u/63921263?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/jkrlr",
      html_url: "https://github.com/jkrlr",
      followers_url: "https://api.github.com/users/jkrlr/followers",
      following_url:
        "https://api.github.com/users/jkrlr/following{/other_user}",
      gists_url: "https://api.github.com/users/jkrlr/gists{/gist_id}",
      starred_url: "https://api.github.com/users/jkrlr/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/jkrlr/subscriptions",
      organizations_url: "https://api.github.com/users/jkrlr/orgs",
      repos_url: "https://api.github.com/users/jkrlr/repos",
      events_url: "https://api.github.com/users/jkrlr/events{/privacy}",
      received_events_url: "https://api.github.com/users/jkrlr/received_events",
      type: "User",
      site_admin: false,
    },
    html_url: "https://github.com/jkrlr/Awesome-JavaScript-Projects",
    description:
      "This Repository contain awesome vanilla JavaScript projects. ",
    fork: true,
    url: "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects",
    forks_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/forks",
    keys_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/collaborators{/collaborator}",
    teams_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/teams",
    hooks_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/hooks",
    issue_events_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/issues/events{/number}",
    events_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/events",
    assignees_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/branches{/branch}",
    tags_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/tags",
    blobs_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/languages",
    stargazers_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/stargazers",
    contributors_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/contributors",
    subscribers_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/subscribers",
    subscription_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/subscription",
    commits_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/compare/{base}...{head}",
    merges_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/merges",
    archive_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/downloads",
    issues_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/labels{/name}",
    releases_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/jkrlr/Awesome-JavaScript-Projects/deployments",
    created_at: "2021-03-09T02:45:18Z",
    updated_at: "2021-03-09T02:45:19Z",
    pushed_at: "2021-03-09T02:41:14Z",
    git_url: "git://github.com/jkrlr/Awesome-JavaScript-Projects.git",
    ssh_url: "git@github.com:jkrlr/Awesome-JavaScript-Projects.git",
    clone_url: "https://github.com/jkrlr/Awesome-JavaScript-Projects.git",
    svn_url: "https://github.com/jkrlr/Awesome-JavaScript-Projects",
    homepage: "https://vishal-raj-1.github.io/Awesome-JavaScript-Projects/",
    size: 97598,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    has_issues: false,
    has_projects: true,
    has_downloads: true,
    has_wiki: true,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "main",
  },
  {
    id: 323888457,
    node_id: "MDEwOlJlcG9zaXRvcnkzMjM4ODg0NTc=",
    name: "awesome-python",
    full_name: "jkrlr/awesome-python",
    private: false,
    owner: {
      login: "jkrlr",
      id: 63921263,
      node_id: "MDQ6VXNlcjYzOTIxMjYz",
      avatar_url: "https://avatars.githubusercontent.com/u/63921263?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/jkrlr",
      html_url: "https://github.com/jkrlr",
      followers_url: "https://api.github.com/users/jkrlr/followers",
      following_url:
        "https://api.github.com/users/jkrlr/following{/other_user}",
      gists_url: "https://api.github.com/users/jkrlr/gists{/gist_id}",
      starred_url: "https://api.github.com/users/jkrlr/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/jkrlr/subscriptions",
      organizations_url: "https://api.github.com/users/jkrlr/orgs",
      repos_url: "https://api.github.com/users/jkrlr/repos",
      events_url: "https://api.github.com/users/jkrlr/events{/privacy}",
      received_events_url: "https://api.github.com/users/jkrlr/received_events",
      type: "User",
      site_admin: false,
    },
    html_url: "https://github.com/jkrlr/awesome-python",
    description:
      "A curated list of awesome Python frameworks, libraries, software and resources",
    fork: true,
    url: "https://api.github.com/repos/jkrlr/awesome-python",
    forks_url: "https://api.github.com/repos/jkrlr/awesome-python/forks",
    keys_url: "https://api.github.com/repos/jkrlr/awesome-python/keys{/key_id}",
    collaborators_url:
      "https://api.github.com/repos/jkrlr/awesome-python/collaborators{/collaborator}",
    teams_url: "https://api.github.com/repos/jkrlr/awesome-python/teams",
    hooks_url: "https://api.github.com/repos/jkrlr/awesome-python/hooks",
    issue_events_url:
      "https://api.github.com/repos/jkrlr/awesome-python/issues/events{/number}",
    events_url: "https://api.github.com/repos/jkrlr/awesome-python/events",
    assignees_url:
      "https://api.github.com/repos/jkrlr/awesome-python/assignees{/user}",
    branches_url:
      "https://api.github.com/repos/jkrlr/awesome-python/branches{/branch}",
    tags_url: "https://api.github.com/repos/jkrlr/awesome-python/tags",
    blobs_url:
      "https://api.github.com/repos/jkrlr/awesome-python/git/blobs{/sha}",
    git_tags_url:
      "https://api.github.com/repos/jkrlr/awesome-python/git/tags{/sha}",
    git_refs_url:
      "https://api.github.com/repos/jkrlr/awesome-python/git/refs{/sha}",
    trees_url:
      "https://api.github.com/repos/jkrlr/awesome-python/git/trees{/sha}",
    statuses_url:
      "https://api.github.com/repos/jkrlr/awesome-python/statuses/{sha}",
    languages_url:
      "https://api.github.com/repos/jkrlr/awesome-python/languages",
    stargazers_url:
      "https://api.github.com/repos/jkrlr/awesome-python/stargazers",
    contributors_url:
      "https://api.github.com/repos/jkrlr/awesome-python/contributors",
    subscribers_url:
      "https://api.github.com/repos/jkrlr/awesome-python/subscribers",
    subscription_url:
      "https://api.github.com/repos/jkrlr/awesome-python/subscription",
    commits_url:
      "https://api.github.com/repos/jkrlr/awesome-python/commits{/sha}",
    git_commits_url:
      "https://api.github.com/repos/jkrlr/awesome-python/git/commits{/sha}",
    comments_url:
      "https://api.github.com/repos/jkrlr/awesome-python/comments{/number}",
    issue_comment_url:
      "https://api.github.com/repos/jkrlr/awesome-python/issues/comments{/number}",
    contents_url:
      "https://api.github.com/repos/jkrlr/awesome-python/contents/{+path}",
    compare_url:
      "https://api.github.com/repos/jkrlr/awesome-python/compare/{base}...{head}",
    merges_url: "https://api.github.com/repos/jkrlr/awesome-python/merges",
    archive_url:
      "https://api.github.com/repos/jkrlr/awesome-python/{archive_format}{/ref}",
    downloads_url:
      "https://api.github.com/repos/jkrlr/awesome-python/downloads",
    issues_url:
      "https://api.github.com/repos/jkrlr/awesome-python/issues{/number}",
    pulls_url:
      "https://api.github.com/repos/jkrlr/awesome-python/pulls{/number}",
    milestones_url:
      "https://api.github.com/repos/jkrlr/awesome-python/milestones{/number}",
    notifications_url:
      "https://api.github.com/repos/jkrlr/awesome-python/notifications{?since,all,participating}",
    labels_url:
      "https://api.github.com/repos/jkrlr/awesome-python/labels{/name}",
    releases_url:
      "https://api.github.com/repos/jkrlr/awesome-python/releases{/id}",
    deployments_url:
      "https://api.github.com/repos/jkrlr/awesome-python/deployments",
    created_at: "2020-12-23T11:49:37Z",
    updated_at: "2020-12-23T11:49:39Z",
    pushed_at: "2020-12-18T12:31:33Z",
    git_url: "git://github.com/jkrlr/awesome-python.git",
    ssh_url: "git@github.com:jkrlr/awesome-python.git",
    clone_url: "https://github.com/jkrlr/awesome-python.git",
    svn_url: "https://github.com/jkrlr/awesome-python",
    homepage: "https://awesome-python.com/",
    size: 6504,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    has_issues: false,
    has_projects: true,
    has_downloads: true,
    has_wiki: false,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: {
      key: "other",
      name: "Other",
      spdx_id: "NOASSERTION",
      url: null,
      node_id: "MDc6TGljZW5zZTA=",
    },
    allow_forking: true,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "public",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: "master",
  },
];
/*
    const someValue = 'some';  
....  
    <Link to={this.props.myroute} onClick={() => hello(someValue)}>Here</Link>

    OR
  <Link to={this.props.myroute} onClick={hello}>Here</Link>

  https://stackoverflow.com/a/50221614
*/

/*
The state property can be used to set a stateful value for the new location which is stored inside history state. This value can subsequently be accessed via useLocation().

<Link to="new-path" state={{ some: "value" }} />

You can access this state value while on the "new-path" route:

let { state } = useLocation();

*/

export const RepoList = () => {
  console.log("Render count in src/RepoList/index.tsx: ", window.renderCount++);
  const [ inputSearch, setInputSearch ] = useState("");
  const [ repos, setRepos ] = useState([]);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(inputSearch.toLowerCase())
  );

  useEffect(() => { 
    console.log("useEffect called")
    
    async function getUserRepos() {
      console.log("getUserRepos called")
      const response = await axios.get('http://localhost:3001/api/repos', { withCredentials: true })
      const data = response.data;
      setRepos(data.data);
      console.log("repos's data", data)
    }
    getUserRepos();
  }, [])

  return (
    <div className="px-8 py-6">
      <InputSearchBox
        handleInputSearchChange={handleInputSearchChange}
        placeholder="Search by Repo name..."
      />
      <ul className="my-4 space-y-3">
        {filteredRepos.map((repo, idx) => (
          <li
            key={repo.id}
            className="flex justify-between gap-x-6 p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-200 hover:bg-gray-300 group hover:shadow"
          >
            <div className="flex min-w-0 gap-x-4">
              {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={repo.owner.avatar_url} alt="" /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-700">
                  {idx + 1}. {repo.name}
                </p>
                <Link
                  to={repo.html_url}
                  className="mt-1 truncate text-xs leading-5 text-blue-700 inline-flex items-center justify-center px-2 py-0.5 ms-3 font-medium bg-gray-100 rounded"
                >
                  View on Github
                </Link>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Link
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                to={`/repos/${repo.name}/dependencies`}
                state={{ repo: repo }}
              >
                Parse pom.xml files <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
