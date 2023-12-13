import React, { useState } from 'react';
import axios from 'axios';

const RepoSelector = () => {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [dependencies, setDependencies] = useState([]);

  const handleGetDependencies = async () => {
    try {
      const response = await axios.get(`/api/repo/${owner}/${repo}`); // Send a request to your Node.js backend to fetch dependencies.
      setDependencies(response.data.dependencies);
    } catch (error) {
      console.error('Error fetching dependencies:', error);
    }
  };

  return (
    <div>
      <h2>Select a GitHub Repository</h2>
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Repository"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <button onClick={handleGetDependencies}>Get Dependencies</button>

      {dependencies.length > 0 && (
        <div>
          <h3>Dependencies:</h3>
          <ul>
            {dependencies.map((dependency, index) => (
              <li key={index}>{dependency}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RepoSelector;
