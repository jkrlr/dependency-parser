import React from "react";
import { useSearchParams } from "react-router-dom";


export const GithubProfile = () => {
  console.log("Render count in src/GithubProfile/index.tsx: ", window.renderCount++);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const code = searchParams.get("code");

  return <div>GithubProfile</div>;
};
