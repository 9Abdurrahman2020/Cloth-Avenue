import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PaymentSuccesful = () => {
    interface IAddress {
        [key: string]: any
    }
    const { id } = useParams();
    const [orderData, setOrderData] = useState<IAddress>({});
    const { firstName, lastName, address, product, transactionId } = orderData;
    useEffect( ()=>{
        fetch(`https://obscure-eyrie-36427.herokuapp.com/order/${id}`)
        .then(res=>res.json())
        .then( data =>setOrderData(data))
    },[id])
    return (
        <Container className='py-5 px-3'>
            <Row>
            <div className="col-md-6">
                <h2>Your order confirmed </h2>
                <p>Hi, {firstName} {lastName}</p>
                <p>Your order has been confirmed and will be shipping soon to.</p>
                <h5>{address}</h5>
            </div>
            <div className="col-md-6">
                <h2>Transaction ID</h2>
                <p>{transactionId}</p>
            </div>
            </Row>
            <hr />
            <Row>
                <div className="col-7 row align-items-center">
                    <div className="col-4">
                        <img width="100%" src={product?.img} alt="" />
                    </div>
                    <div className="col-8">
                        <h5>{product?.title}</h5>
                        <p className='text-secondary'>{product?.brand}</p>
                    </div>
                </div>
                <div className="col-5 row align-items-center text-end">
                    <div className="col-6">
                        <p>Qty: {product?.quantity}</p>
                    </div>
                    <div className="col-6">
                        <p>${(product?.price*product?.quantity).toFixed(2)}</p>
                    </div>
                </div>
            </Row>
            <hr />
            <Row className='px-4'>
                <div className="col-6">
                    Subtotal
                </div>
                <div className="col-6 text-end">
                <p>${(product?.price*product?.quantity).toFixed(2)}</p>
                </div>
            </Row>
            <Row className='px-4'>
                <div className="col-6">
                    Shipping
                </div>
                <div className="col-6 text-end">
                <p>Free</p>
                </div>
            </Row>
            <Row className='px-4'>
                <div className="col-6">
                    Texes
                </div>
                <div className="col-6 text-end">
                <p>$0</p>
                </div>
            </Row>
            <hr />
            <Row className='px-4'>
                <div className="col-6">
                    Total
                </div>
                <div className="col-6 text-end">
                <p>${(product?.price*product?.quantity).toFixed(2)}</p>
                </div>
            </Row>
            <p className='text-center my-1'>Thank you !</p>
            <p className='text-secondary text-center my-1'>{firstName} {lastName}</p>
        </Container>
    );
};

export default PaymentSuccesful;