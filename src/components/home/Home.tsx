import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setAllProducts, setStatus } from '../../features/counter/storeSlice';
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
    const dispatch = useAppDispatch()
    useEffect( ()=>{
        dispatch(setStatus("loading"))
        fetch('http://localhost:5000/products')
        .then( res=> res.json())
        .then( data => {
            dispatch(setAllProducts(data))
            dispatch(setStatus("successful"))
        })
    },[])
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