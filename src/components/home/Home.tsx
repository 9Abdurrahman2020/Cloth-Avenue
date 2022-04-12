import React from 'react';
import Banner from './banner/Banner';
import ForCategory from './forCategory/ForCategory';
import Offer from './offer/Offer';

const Home = () => {
    return (
        <div>
            <Offer/>
            <Banner/>
            <ForCategory/>
        </div>
    );
};

export default Home;