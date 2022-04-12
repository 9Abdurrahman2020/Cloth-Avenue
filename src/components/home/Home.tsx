import React from 'react';
import Banner from './banner/Banner';
import Collections from './collections/Collections';
import ForCategory from './forCategory/ForCategory';
import Offer from './offer/Offer';

const Home = () => {
    return (
        <div>
            <Offer/>
            <Banner/>
            <ForCategory/>
            <Collections/>
        </div>
    );
};

export default Home;