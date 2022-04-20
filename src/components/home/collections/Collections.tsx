import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './collections.css';

const Collections = () => {
    return (
        <Container>
            <h2>Our Collections</h2>
            <Row className="collection-container g-4">
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-17_320x.jpg?v=1533828251" alt="" />
                        <p>Shorts</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-bottoms-6_320x.jpg?v=1583793050" alt="" />
                        <p>Jeans</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-27_320x.jpg?v=1642781414" alt="" />
                        <p>T-Shirts</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-mens-tops-34_600x.jpg?v=1533831979" alt="" />
                        <p>Shirts</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-womens-dresses-16_320x.jpg?v=1533820936" alt="" />
                        <p>Dresses</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-womens-tops-9_320x.jpg?v=1534170910" alt="" />
                        <p>Tanks</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-womens-tops-13_320x.jpg?v=1618925504" alt="" />
                        <p>Blouses</p>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className='text-center'>
                        <img className='w-100' src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-womens-bottoms-35_320x.jpg?v=1533917734" alt="" />
                        <p>Skirts</p>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default Collections;