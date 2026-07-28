import React from 'react';
import HeroHome from '../../components/homepageComp/HeroHome';
import AboutJournal from '../../components/homepageComp/AboutJournal';
import RecentlyPublishedArticles from '../../components/homepageComp/RecentlyPublishedArticles';

const Home = () => {
  return (
    <div className="w-full animate-fade-in">
      <HeroHome />
      <AboutJournal />
      <RecentlyPublishedArticles />
      
      {/* Rest of the Home Page content will go below here */}
      
    </div>
  )
}

export default Home;
