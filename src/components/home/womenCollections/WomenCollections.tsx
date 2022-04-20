import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProductCard from '../productCard/ProductCard';
import './womenCollections.css';
const WomenCollections = () => {
    
    const [curProduct, setCurProduct ] = useState<string>("tanks");
    
    return (
        <Container className="my-5">
            <h2>Women's Collection</h2>
            <div className="tab-container">
                <p className={`${curProduct === 'dresses' && 'c-w-category'}`} onClick={ ()=> setCurProduct("dresses")}>Dresses</p>
                <p className={`${curProduct === 'tanks' && 'c-w-category'}`} onClick={ ()=> setCurProduct("tanks")}>Tanks</p>
                <p className={`${curProduct === 'skirts' && 'c-w-category'}`} onClick={ ()=> setCurProduct("skirts")}>Skirts</p>
            </div>
            <Row>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <ProductCard/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <ProductCard/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <ProductCard/>
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <ProductCard/>
                </div>
            </Row>
        </Container>
    );
};

export default WomenCollections;