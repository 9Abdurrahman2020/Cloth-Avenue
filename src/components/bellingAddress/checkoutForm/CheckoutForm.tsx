import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { removeCartProduct, setCartPrice } from '../../../features/counter/storeSlice';
interface IAddress {
    [key: string]: any
}

const CheckoutForm = ({data}:{data:IAddress}) => {
    
    const stripe = useStripe();
    const elements = useElements();
    const [ paymentError, setPaymentError ] = useState<string | undefined>('');
    const [ clientSecret, setClientSecret ] = useState<string>('');
    const [ processing, setProcessing ] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect( ()=>{
        fetch(`https://obscure-eyrie-36427.herokuapp.com/create-payment-intent`,{
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        }).then( res=>res.json())
        .then(result=>setClientSecret(result.clientSecret))
    },[data])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
        setPaymentError('')
        setProcessing(true)
        if (!stripe || !elements) {
            return;
          }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
          }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
        });
    
        if (error) {
        const errorMessage:string = `${error.message}`;
        setPaymentError(errorMessage)
        } else {
        setPaymentError('')
      }
          
        const {paymentIntent, error:intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: data.firstName + " " + data.lastName,
                  email: data.email,
                  phone: data.phone
                },
              },
            },
          );
          if(intentError){
              setPaymentError(intentError.message)
          }else{
              setPaymentError('')
              const orderData = {...data, transactionId: paymentIntent?.id};
              fetch('https://obscure-eyrie-36427.herokuapp.com/orders',{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then( res=> res.json())
        .then( result =>{
            if(result.acknowledged){
                dispatch(removeCartProduct(data.product._id))
                dispatch(setCartPrice())
                navigate(`/payment/${paymentIntent?.id}`)
            }
        })
          }
          setProcessing(false)
    }
    return (
        <div className='my-3'>
            <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className='text-danger my-2'>{paymentError}</p>
      {
        processing ? <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> : <button className='btn btn-danger my-3' type="submit" disabled={!stripe}>
        Pay ${(data.product.price * data.product.quantity).toFixed(2)}
      </button>
      }
    </form>
        </div>
    );
};

export default CheckoutForm;