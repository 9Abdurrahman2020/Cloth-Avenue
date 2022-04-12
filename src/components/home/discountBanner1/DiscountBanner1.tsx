import React from 'react';
import { Container } from 'react-bootstrap';

const DiscountBanner1 = () => {
    return (
        <Container title="25% off Accessories" className='text-center py-4 my-4' style={{background:"#fcfbd8",color:"black"}}>
            <h1>25% off Accessories</h1>
            <h4>Grab them before they're gone</h4>
            <h5 className='text-secondary'>Offer ends August 1</h5>
        </Container>
    );
};

export default DiscountBanner1;