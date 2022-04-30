import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { removeCartProduct, setCartPrice } from '../../features/counter/storeSlice';
import { ICart } from '../../features/Types';
import './singleCartProduct.css';

const SingleCartProduct = ({data}:{data:ICart}) => {
    const dispatch = useAppDispatch();
    const removeBtnHandler = () =>{
        dispatch( removeCartProduct(data._id))
        dispatch( setCartPrice())
    }
    return (
        <Row>
            <div className="col-5">
                <img width="100%" src={data.img} alt="" />
            </div>
            <div className="col-5">
                <Link className='cart-product-title' to={`/product/${data._id}`}><p className="my-1">{data.title}</p></Link>
                <Rating 
                readonly
                initialRating={data.rating}
                fullSymbol={<FontAwesomeIcon style={{fontSize:"12px"}} className='text-warning' icon={faStar}/>}
                emptySymbol={<FontAwesomeIcon style={{fontSize:"12px"}} className='empty-star-icon' icon={regStar}/>}
                /> <br />
                <small className="my-1">Each: ${data.price}</small> <br />
                <small className="my-1">Quantity: {data.quantity}</small> <br />
                <b className="my-1">Total: ${((data.price) * (data.quantity)).toFixed(2)}</b>
            </div>
            <div className="col-2">
                <button onClick={ removeBtnHandler } className="btn btn-danger">X</button>
            </div>
            <hr />
        </Row>
    );
};

export default SingleCartProduct;