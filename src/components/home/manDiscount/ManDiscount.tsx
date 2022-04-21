import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './manDiscount.css';

const ManDiscount = () => {
    return (
        <Container className="py-5 px-3 my-5 man-discount-container">
            <Row>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                    <h1>Save 25% on All Men's accessories</h1>
                    <h4>Now through September 1</h4>
                </div>
            </Row>
        </Container>
    );
};

export default ManDiscount;