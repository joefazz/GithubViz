import React, { useEffect, useState } from 'react';
import Card from '../Card';
import { baseUrl } from '../../consts';
import Visualisation from '../Visualisation';
import { format, fromUnixTime } from 'date-fns';
import {
  mapDataToMonthsObject,
  plotDataToXY,
  mapDataToYearsObject,
  sortArrayOfObjectsFromKey
} from '../../utils';

function GithubBreakdownScreen({ profile }) {
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState({});

  useEffect(() => {
    fetch(`${baseUrl}/users/${profile.username}/repos`)
      .then((res) => res.json())
      .then((json) => {
        const sortedRepos = sortArrayOfObjectsFromKey(json, 'stargazers_count').slice(0, 5);

        setRepos(sortedRepos);
        setSelectedRepo(sortedRepos[0]);
        setLoadingRepos(false);
      });
  }, [profile.username]);

  return (
    <div className="flex h-screen w-screen">
      <header className="flex-none flex bg-gray-400">
        <div className="px-4 flex flex-col items-center justify-between my-4 border-gray-500 border-r-2">
          <div className="bg-gray-200 w-full mx-auto px-4 py-4 inline-flex items-center justify-between rounded-lg shadow-md">
            <div className="h-24 w-24 rounded-full shadow-md border-2 border-gray-900 overflow-hidden">
            <img
              src={profile.avatarUrl}
              alt={`${profile.name}'s Avatar'`}
              className="w-full h-full object-fit"
            />
            </div>
            <div className="flex flex-col items-center ml-4 justify-center">
              <h1 className="text-3xl text-gray-900 font-bold text-center leading-relaxed tracking-wide">
                {profile.name}
              </h1>
              <p className="text-md text-gray-700 text-center">{profile.bio}</p>
            </div>
          </div>
          <div className="bg-gray-200 w-full mx-auto mt-6 px-4 py-4 flex flex-col justify-between rounded-lg shadow-md">
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
      <section className="flex-auto p-2 py-4 bg-gray-200 flex flex-col justify-between border-gray-500">
        <div className="inline-flex items-center justify-center">
          <Card title={'Commits per Week'}>
            {selectedRepo.id && (
              <Visualisation
                axes={{ x: 'Week', y: 'No. Commits' }}
                query={`/repos/${profile.username}/${selectedRepo.name}/stats/commit_activity`}
                transformationFunction={(res) => {
                  const data = res.map((item) => ({
                    x: format(fromUnixTime(item.week), 'ww'),
                    y: item.total
                  }));

                  const sortedData = sortArrayOfObjectsFromKey(data, 'x', true);

                  return sortedData;
                }}
              />
            )}
          </Card>
          <Card title={'Forks per Month'}>
            {selectedRepo.id && (
              <Visualisation
                axes={{ x: 'Month', y: 'Forks' }}
                query={`/repos/${profile.username}/${selectedRepo.name}/forks`}
                transformationFunction={(response) => plotDataToXY(mapDataToMonthsObject(response))}
              />
            )}
          </Card>
        </div>
        <div className="inline-flex items-center justify-center">
          <Card title={'Pull Requests per Year'}>
            {selectedRepo.id && (
              <Visualisation
                axes={{ x: 'Year', y: 'No. Pull Requests' }}
                query={`/repos/${profile.username}/${selectedRepo.name}/pulls`}
                transformationFunction={(response) => plotDataToXY(mapDataToYearsObject(response))}
              />
            )}
          </Card>
          <Card title={'Issues Created during 2019'}>
            {selectedRepo.id && (
              <Visualisation
                axes={{ x: 'Month', y: 'No. Issues Created' }}
                query={`/repos/${profile.username}/${selectedRepo.name}/issues?since='2019-01-01T00:00:00Z'`}
                transformationFunction={(response) => plotDataToXY(mapDataToMonthsObject(response))}
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
    return [0, 1, 2, 3, 4].map((_, i) => (
      <li key={i}>
        <div
          className="w-full bg-gray-300 px-2 py-2 rounded-lg mt-4 border border-gray-900 shadow-md hover:shadow-none"
        >
          <p className="text-lg text-gray-900 font-semibold">&nbsp;</p>
          <p className="text-md text-gray-800">&nbsp;</p>
        </div>
      </li>
    ));
  }

  if (repos.length === 0) {
    return <span>No repositories :(</span>;
  }

  return repos.map((repo) => (
    <li key={repo.id}>
      <button
        onClick={() => setSelected(repo)}
        className={`w-full bg-gray-300 px-2 py-2 rounded-lg mt-4 border border-gray-900 shadow-md hover:shadow-none ${
          selected.id === repo.id ? 'shadow-none bg-gray-400' : ''
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
