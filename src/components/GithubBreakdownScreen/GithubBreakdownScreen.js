import React from 'react';
import Card from '../Card';

function GithubBreakdownScreen() {
  return (
    <div className="flex h-screen w-screen">
      <header className="flex-none px-5 bg-blue-800 border-r-2 border-blue-900">
        <h1 className="text-xl text-gray-300 py-3 font-light leading-relaxed tracking-wide">Breakdown</h1>
      </header>
      <section className="flex-auto p-2 py-4 bg-gray-200 flex flex-row justify-around items-center">
        <Card title={'Point 1'}>Content</Card>
        <Card title={'Point 1'}>Content</Card>
        <Card title={'Point 1'}>Content</Card>
      </section>
    </div>
  );
}

export default GithubBreakdownScreen;
