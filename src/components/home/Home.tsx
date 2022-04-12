import React from 'react';
import Banner from './banner/Banner';
import Collections from './collections/Collections';
import DiscountBanner1 from './discountBanner1/DiscountBanner1';
import ForCategory from './forCategory/ForCategory';
import Offer from './offer/Offer';

const Home = () => {
    return (
        <div>
            <Offer/>
            <Banner/>
            <ForCategory/>
            <Collections/>
            <DiscountBanner1/>
        </div>
    );
};

export default Home;