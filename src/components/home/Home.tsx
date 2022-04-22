import React from 'react';
import Banner from './banner/Banner';
import Collections from './collections/Collections';
import DiscountBanner1 from './discountBanner1/DiscountBanner1';
import FilterProduct from './filterProduct/FilterProduct';
import ForCategory from './forCategory/ForCategory';
import MenCollections from './manCollection/ManCollection';
import ManDiscount from './manDiscount/ManDiscount';
import Offer from './offer/Offer';
import OurBrand from './ourBrand/OurBrand';
import ServiceDemo from './serviceDemo/ServiceDemo';
import WomenCollections from './womenCollections/WomenCollections';
import WomenDiscount from './womenDiscount/WomenDiscount';

const Home = () => {
    return (
        <div>
            <Offer/>
            <Banner/>
            <ForCategory/>
            <Collections/>
            <DiscountBanner1/>
            <FilterProduct/>
            <WomenDiscount/>
            <WomenCollections/>
            <ManDiscount/>
            <MenCollections/>
            <ServiceDemo/>
            <OurBrand/>
        </div>
    );
};

export default Home;