import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './womenDiscount.css';

const WomenDiscount = () => {
    return (
        <Container className="py-5 px-3 my-5 women-discount-container">
            <Row>
                <div className="col-md-6">
                    <h1>Save 40% on Women's accessories</h1>
                    <h4>Now through September 1</h4>
                </div>
            </Row>
        </Container>
    );
};

export default WomenDiscount;