import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store';
import { removeCartProduct, setCartPrice, setCartProduct } from '../../../features/counter/storeSlice';
import { ICart } from '../../../features/Types';

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
        <Row className="align-items-center justify-content-center">
                <div className="row col-md-5 align-items-center justify-content-center">
                    <div className="col-md-6">
                        <img width="100%" src={pd.img} alt="product img" />
                    </div>
                    <div className="col-md-6">
                        <Link className='cart-product-title' to={`/product/${pd._id}`}><p>{pd.title}</p></Link>                        <p>Size: {pd.size}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 style={{color:"#e32e00"}}>${pd.price}</h5>
                </div>
                <div className="col-md-2">
                    <div className="text-center">
                        <div className="quantity-input-box my-3">
                            <button onClick={ ()=> setInputValue('minus')}>-</button>
                            <input type="text" value={pd.quantity} readOnly />
                            <button onClick={ ()=> setInputValue('plus')}>+</button>
                        </div>
                        <p onClick={ cartProductRemoveHandler } className="checkout-remove-button">Remove</p>
                    </div>
                </div>
                <div className="col-md-2">
                    ${(pd.price * pd.quantity).toFixed(2)}
                </div>
                <hr />
            </Row> 
    );
};

export default CheckoutSingleProduct;