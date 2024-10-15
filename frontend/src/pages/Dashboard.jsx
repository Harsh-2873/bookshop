import React from 'react'
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Dashboard = () => {
  return <div className='bg-black text-black px-10 py-8'>
    <Hero />
    <RecentlyAdded />
  </div>
};

export default Dashboard;