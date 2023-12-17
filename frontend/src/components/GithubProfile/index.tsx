import React from "react";
import { useSearchParams } from "react-router-dom";

// ToDo: Add the code of profile rendering here from GithubAuth/index.tsx

export const GithubProfile = () => {
  console.log("Render count in src/GithubProfile/index.tsx: ", window.renderCount++);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const code = searchParams.get("code");

  return <div>GithubProfile</div>;
};
