import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { baseUrl } from '../../consts';
import Visualisation from '../Visualisation';

function GithubBreakdownScreen({ profile }) {
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState({});

  useEffect(() => {
    fetch(`${baseUrl}/users/${profile.username}/repos`)
      .then((res) => res.json())
      .then((json) => {
        const sortedRepos = json
          .sort((b, a) => {
            var x = a['stargazers_count'];
            var y = b['stargazers_count'];
            return x < y ? -1 : x > y ? 1 : 0;
          })
          .slice(0, 5);

        setRepos(sortedRepos);
        setSelectedRepo(sortedRepos[0]);
        setLoadingRepos(false);
      });
  }, []);

  console.log(repos);
  return (
    <div className="flex h-screen w-screen">
      <header className="flex-none flex bg-gray-400">
        <div className="px-2 flex flex-col items-center max-w-sm my-4 border-gray-500 border-r-2">
          <div className="bg-gray-200 w-full mx-auto px-4 py-4 inline-flex items-center justify-between rounded-lg shadow-md">
            <img
              src={profile.avatarUrl}
              className="h-24 w-24 rounded-full shadow-md border-2 border-gray-900"
            />
            <div className="flex flex-col items-center ml-4 justify-center">
              <h1 className="text-3xl text-gray-900 font-bold text-center leading-relaxed tracking-wide">
                {profile.name}
              </h1>
              <p className="text-md text-gray-700 text-center">{profile.bio}</p>
            </div>
          </div>
          <div className="bg-gray-200 w-full mx-auto mt-4 px-4 py-4 flex flex-col justify-between rounded-lg shadow-md">
            <h2 className="text-xl text-gray-900 font-bold">Popular Repositories</h2>
            <ul>
              <RepoList
                loading={loadingRepos}
                repos={repos}
                selected={selectedRepo}
                setSelected={setSelectedRepo}
              />
            </ul>
          </div>
        </div>
      </header>
      <section className="flex-auto p-2 py-4 bg-gray-200 flex flex-col justify-around items-center">
        <div className="inline-flex items-center justify-center">
          <Card title={'Commits Per Week'}>
            {selectedRepo.id && (
              <Visualisation
                query={`/repos/${profile.username}/${selectedRepo.name}/stats/commit_activity`}
              />
            )}
          </Card>
          <Card title={'Commits Per Week'}>
            {selectedRepo.id && (
              <Visualisation
                query={`/repos/${profile.username}/${selectedRepo.name}/stats/commit_activity`}
              />
            )}
          </Card>
        </div>
        <div className="inline-flex items-center justify-center">
          <Card title={'Commits Per Week'}>
            {selectedRepo.id && (
              <Visualisation
                query={`/repos/${profile.username}/${selectedRepo.name}/stats/commit_activity`}
              />
            )}
          </Card>
          <Card title={'Commits Per Week'}>
            {selectedRepo.id && (
              <Visualisation
                query={`/repos/${profile.username}/${selectedRepo.name}/stats/commit_activity`}
              />
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}

function RepoList({ loading, repos, selected, setSelected }) {
  if (loading) {
    return <span>Getting repositories...</span>;
  }

  if (repos.length === 0) {
    return <span>No repositories :(</span>;
  }

  return repos.map((repo) => (
    <li key={repo.id}>
      <button
        onClick={() => setSelected(repo)}
        className={`w-full bg-gray-300 px-2 py-2 rounded-lg mt-4 border border-gray-900 shadow-md hover:shadow-none ${
          selected.id === repo.id ? 'shadow-none' : ''
        }`}
      >
        <p className="text-lg text-gray-900 font-semibold">{repo.name}</p>
        <p className="text-md text-gray-800">
          {repo.stargazers_count} Stargazers - {repo.forks_count} Forkers
        </p>
      </button>
    </li>
  ));
}

export default GithubBreakdownScreen;
