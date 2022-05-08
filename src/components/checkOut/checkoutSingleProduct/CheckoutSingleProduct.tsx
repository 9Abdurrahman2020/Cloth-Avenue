import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store';
import { removeCartProduct, setCartPrice, setCartProduct } from '../../../features/counter/storeSlice';
import { ICart } from '../../../features/Types';
import './checkoutSingleProduct.css';

const CheckoutSingleProduct = ({pd}:{pd:ICart}) => {
    const dispatch = useAppDispatch();
    const [ quantity, setQuantity ] = useState<number>(pd.quantity);  

    const setInputValue = (operator:string) =>{
        if(operator === 'minus'){
            if(quantity>1){
                setQuantity(quantity-1)
                    dispatch(setCartProduct({...pd,quantity: quantity-1}))
                    dispatch( setCartPrice())
            }
        }else if(operator === 'plus'){
            if(quantity< pd.stock){
                setQuantity(quantity+1)
                    dispatch(setCartProduct({...pd,quantity: quantity+1}))
                    dispatch( setCartPrice())
            }else{
                toast(`Sorry only ${pd.stock} items in our stock !`)
            }
        }
    }
    const cartProductRemoveHandler=() =>{
        dispatch(removeCartProduct(pd._id))
        dispatch(setCartPrice())
    }
    return (
        <>
        <Row className="align-items-center py-2">
                <div className="row col-6 col-md-3 align-items-center">
                    <div className="col-md-6">
                        <img width="100%" src={pd.img} alt="product img" />
                    </div>
                </div>
                <div className="row col-6 col-md-9">
                <div className="col-md-3">
                        <Link className='cart-product-title' to={`/product/${pd._id}`}><p>{pd.title}</p></Link>                        
                        <p>Size: {pd.size}</p>
                </div>
                <div className="col-md-3">
                    <h5 style={{color:"#e32e00"}}>${pd.price}</h5>
                </div>
                <div className="col-md-4">
                    <div className="quantity-box text-center">
                        <div className="quantity-input-box my-3">
                            <button onClick={ ()=> setInputValue('minus')}>-</button>
                            <input type="text" value={pd.quantity} readOnly />
                            <button onClick={ ()=> setInputValue('plus')}>+</button>
                        </div>
                        <span onClick={ cartProductRemoveHandler } className="checkout-remove-button">Remove</span>
                    </div>
                </div>
                <div className="col-md-2 py-2">
                    <p>${(pd.price * pd.quantity).toFixed(2)}</p>
                    <Link to={`/belling-address/${pd._id}`}>
                        <Button variant="danger">Checkout</Button>
                    </Link>
                </div>
                </div>
            </Row>
            <hr/>
        </> 
    );
};

export default CheckoutSingleProduct;