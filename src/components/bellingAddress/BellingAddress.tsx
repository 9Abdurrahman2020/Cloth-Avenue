import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { removeCartProduct, setCartPrice } from '../../features/counter/storeSlice';
import { ICart } from '../../features/Types';
import useAuth from '../../hook/useAuth';
import './bellingAddress.css';
import CheckoutForm from './checkoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51Jw1qAKT6HOBewVuSmAorn0ZpVtPoYvOCVJJQuSLEomeYx3TF5u7Gu2lXhaS0jVbzye1K3y8n8GA7q7D5twiBXZs00xZTaPPdw');

const BellingAddress = () => {
    interface IAddress {
        [key: string]: any
    }
    const {id} = useParams()
    const { user } = useAuth();
    const dispatch = useAppDispatch()
    const [ paymentMethod, setPaymentMethod ] = useState<string>('stripe');
    const cartProduct = useAppSelector( state=> state.cart);
    let thisProduct:ICart | undefined = cartProduct.find( pd=> pd._id === id );
    const [ inputData, setInputData ] = useState<IAddress>({product:thisProduct, email:user.email});

    useEffect( ()=>{
        setInputData({...inputData, paymentMethod})
    },[paymentMethod])

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInputData = { ...inputData }
        newInputData[field] = value ;
        setInputData(newInputData);
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        fetch('http://localhost:5000/orders',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(inputData)
        })
        .then( res=> res.json())
        .then( result =>{
            if(result.acknowledged){
                toast('Successfully placed your order !')
                dispatch(removeCartProduct(inputData.product._id))
                dispatch(setCartPrice())
            }
        })
    }
    return (
        <Container className="p-4">
            <h3 className='my-3'>Shipping Address</h3>
            <form onSubmit={handleFormSubmit}>
            <Row className='g-1'>
                <div className="col-12 col-md-6">
                <div className="input-group mb-3">
                    <input onChange={ handleOnChange} type="text" className="form-control" name="firstName" placeholder="First name" aria-label="name" aria-describedby="basic-addon1" required/>
                </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="input-group mb-3">
                    <input onChange={ handleOnChange} type="text" className="form-control" name="lastName" placeholder="Last name" aria-label="name" aria-describedby="basic-addon1" required/>
                </div>
                </div>
            </Row>
            <Row className='g-1'>
                <div className="col-12 col-md-6">
                <div className="input-group mb-3">
                    <input onChange={ handleOnChange} type="text" className="form-control" name="country" placeholder="Country" aria-label="country" aria-describedby="basic-addon1" required/>
            </div>
                </div>
                <div className="col-12 col-md-6">
                <div className="input-group mb-3">
                    <input onChange={ handleOnChange} type="text" className="form-control" name="city" placeholder="City" aria-label="name" aria-describedby="basic-addon1" required/>
            </div>
                </div>
            </Row>
            <div className="input-group mb-3">
                    <input onChange={ handleOnChange} type="text" className="form-control" name="address" placeholder="Address" aria-label="address" aria-describedby="basic-addon1" required/>
            </div>
            <h3 className='my-3'>Contact Information</h3>
            <div className="input-group mb-3">
                <input onChange={ handleOnChange} type="email" className="form-control" defaultValue={user.email} name="email" placeholder="Email" aria-label="address" aria-describedby="basic-addon1" readOnly/>
            </div>
            <div className="input-group mb-3">
                <input onChange={ handleOnChange} type="number" className="form-control" defaultValue={user.phoneNumber} name="phone" placeholder="Phone number" aria-label="address" aria-describedby="basic-addon1" required />
            </div>
            <h3 className='my-3'>Payment Method</h3>
            <div className='payment-method-box-container'>
                <div onClick={ ()=> setPaymentMethod('stripe')} className={`payment-method-box ${paymentMethod === 'stripe' && 'active-payment-method'}`}>Stripe</div>
                <div onClick={ ()=> setPaymentMethod('cashOnDelivery')} className={`payment-method-box ${paymentMethod === 'cashOnDelivery' && 'active-payment-method'}`}>Cash on Delivery</div>
            </div>
            {
                paymentMethod !== 'stripe' && <Button variant="danger" className="my-3" type="submit">Place order</Button>
            }
            </form>
            { 
                paymentMethod === "stripe" && <Elements stripe={stripePromise}>
                <CheckoutForm data={inputData} /> 
              </Elements>
            }
            
        </Container>
    );
};

export default BellingAddress;