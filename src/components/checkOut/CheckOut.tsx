import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppSelector } from '../../app/store';
import './checkout.css';
import CheckoutSingleProduct from './checkoutSingleProduct/CheckoutSingleProduct';

const CheckOut = () => {
    const cartPrice = useAppSelector( state=> state.cartPrice)
    const cartProduct = useAppSelector( state=> state.cart)
    return (
        <div >
            <div className="checkout-page-container">
                <h2 className="text-center">Ready to Checkout ?</h2>
                <h3 className="text-center">Total: ${cartPrice.toFixed(2)}</h3>
            </div>
            <Container className="checkout-product-section">
            <div className="check-out-top-section">
            <Row>
                <div className="col-md-5">
                    Item
                </div>
                <div className="col-md-3">
                    Price
                </div>
                <div className="col-md-2">
                    Quantity
                </div>
                <div className="col-md-2">
                    Total
                </div>
            </Row>
            <hr />
            </div>
            { cartProduct.map( pd=> <CheckoutSingleProduct key={pd._id} pd={pd}/>)}
            </Container>
        </div>
        
    );
};

export default CheckOut;