import React from 'react';
import Navigation from '../common/navigation/Navigation';
import TopNavbar from '../common/topNavbar/TopNavbar';
import Banner from './banner/Banner';

const Home = () => {
    return (
        <div>
            <TopNavbar/>
            <Navigation/>
            <Banner/>
        </div>
    );
};

export default Home;