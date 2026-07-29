import React from 'react';
import CurrentIssueHero from '../../components/currentissuepageComp/CurrentIssueHero';
import CurrentIssueContent from '../../components/currentissuepageComp/CurrentIssueContent';

const CurrentIssue = () => {
  return (
    <div className="w-full">
      <CurrentIssueHero />
      <CurrentIssueContent />
    </div>
  );
};

export default CurrentIssue;
