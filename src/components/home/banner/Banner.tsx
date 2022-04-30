import React from 'react';
import { Link } from 'react-router-dom';
import './banner.css';

const Banner = () => {
    return (
        <div className='banner-container'>
            <h1>Clothing made for the perfect Summer</h1>
            <h5>find the perfect outfit</h5>
            <Link to="/shop"><button>Shop</button></Link>
        </div>
    );
};

export default Banner;