import React from 'react';
import Navigation from '../common/navigation/Navigation';
import TopNavbar from '../common/topNavbar/TopNavbar';
import Banner from './banner/Banner';
import Offer from './offer/Offer';

const Home = () => {
    return (
        <div>
            <TopNavbar/>
            <Navigation/>
            <Offer/>
            <Banner/>
        </div>
    );
};

export default Home;