import React from 'react';
import TeamSection from '../sections/TeamSection.jsx';

export default function About() {
  return (
    <div className="container-max py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">About DigitalVaidya</h1>
      <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
        We are passionate innovators building AI solutions that simplify healthcare for everyone.
      </p>
      <div className="mt-10">
        <TeamSection />
      </div>
    </div>
  );
}


