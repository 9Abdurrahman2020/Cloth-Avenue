import { faCheckCircle, faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Rating from 'react-rating';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCartPrice, setCartProduct, setSingleProduct } from '../../features/counter/storeSlice';
import { initialProduct } from '../../features/Types';
import Review from '../common/review/Review';
import './singleProduct.css';

const SingleProduct = () => {
    interface Reviews {
        _id: string,
        id: string,
        name: string,
        email: string,
        comments: string,
        rate: number
    }
    const { id } = useParams<string>();
    const [ size, setSize ] = useState<string>('S');
    const [ quantity, setQuantity ] = useState<number>(1);  
    const dispatch = useAppDispatch() ;
    const cartProduct = useAppSelector( (state)=>state.cart );
    const product = useAppSelector( (state)=>state.singleProduct );
    const [ currentProduct, setCurrentProduct ] = useState<Boolean>(false)
    const [ reviewBtn, setReviewBtn ] = useState<Boolean>(false)
    const [ reviews, setReviews ] = useState<Reviews[]>([]);
    const navigate = useNavigate();
    
    useEffect( ()=>{
        dispatch(setSingleProduct((initialProduct)));
        fetch(`https://obscure-eyrie-36427.herokuapp.com/product/${id}`)
        .then(res=>res.json())
        .then( (data) => {
            dispatch(setSingleProduct((data)))
        })
    },[id])
    useEffect( ()=>{
        const thisProduct = cartProduct.find( pd=> pd._id === id)
        if(thisProduct){
            setCurrentProduct(true)
            setQuantity(thisProduct.quantity)
            setSize(thisProduct.size)
        }
    },[id])
    useEffect( ()=>{
        fetch(`https://obscure-eyrie-36427.herokuapp.com/reviews/${id}`)
        .then(res=>res.json())
        .then( data => setReviews(data))
    },[id,reviewBtn])
    if(!product.price){
        return (
            <div className="loading-image-container">
                <img width="200px" src="https://cdn.dribbble.com/users/408943/screenshots/2887008/media/5292aff30094d74fffd87a0dba58fa4e.gif"></img>
            </div>
        )
    }
    let price:number = product.price;
    if(product.price>12){
       price = (product.price * .85);
    }
    const setInputValue = (operator:string) =>{
        if(operator === 'minus'){
            if(quantity>1){
                setQuantity(quantity-1)
                if(currentProduct){
                    dispatch(setCartProduct({...product,price:parseFloat(price.toFixed(2)),quantity: quantity-1,size}))
                    dispatch( setCartPrice())
                }
            }
        }else if(operator === 'plus'){
            if(quantity< product.stock){
                setQuantity(quantity+1)
                if(currentProduct){
                    dispatch(setCartProduct({...product,price:parseFloat(price.toFixed(2)),quantity: quantity+1,size}))
                    dispatch( setCartPrice())
                }
            }else{
                toast(`Sorry only ${product.stock} items in our stock !`)
            }
        }
    }

    const cartProductHandler = () =>{
        dispatch(setCartProduct({...product,price:parseFloat(price.toFixed(2)),quantity,size}))
        dispatch( setCartPrice())
        setCurrentProduct(true)
    }
    const setSizeHandler = (size:string) =>{
        setSize(size)
        if(currentProduct){
            dispatch(setCartProduct({...product,price:parseFloat(price.toFixed(2)),quantity,size}))
        }
    }
    const buyBtnClickHandler = () =>{
        dispatch(setCartProduct({...product,price:parseFloat(price.toFixed(2)),quantity,size}))
        navigate(`/belling-address/${product._id}`)
      }
    return (
        <Container className="single-product-container">
            <Row className="g-5 py-5">
                <div className="col-md-6">
                    <InnerImageZoom
                    src={product.img}
                    zoomSrc={product.img}
                    zoomType="hover"
                    zoomPreload={true}
                    zoomScale={1.8}
                    />
                </div>
                <div className="col-md-6 px-5">
                    <h2>{product.title}</h2>
                    <p className=''>{product.brand}</p>
                    <Rating
                    readonly
                    initialRating={product.rating}
                    fullSymbol={<FontAwesomeIcon className='text-warning' icon={faStar}/>}
                    emptySymbol={<FontAwesomeIcon className='empty-star-icon' icon={regStar}/>}
                    />
                    <h4 className='single-page-price'><span>${price.toFixed(2)}</span> <span className="original-price" style={{ display:`${product.price<12 && 'none'}`, textDecoration:'line-through'}}>${product.price}</span> <span className="saved-price" style={{display:`${product.price<12 && 'none'}`}}>Save: ${(product.price - price).toFixed(2)}</span></h4>
                    <p><span className="fw-bold">Free Shipping, Returns & Exchanges </span><br />On all orders over $75</p>
                    <p className="my-0"><span className="fw-bold">Material:</span> 90/10 Cotton/Spandex</p>
                    <p className="mt-0"><span className="fw-bold">Care:</span> Machine Wash/Line Dry</p>
                    <h5 className='text-success'>Only {product.stock} left !</h5>
                    <div>
                        Available size
                        <div className='available-size-container'>
                            <div className={`${size === "S" && 'active'}`} onClick={ ()=> setSizeHandler('S')}>S</div>
                            <div className={`${size === "M" && 'active'}`} onClick={ ()=> setSizeHandler('M')}>M</div>
                            <div className={`${size === "L" && 'active'}`} onClick={ ()=> setSizeHandler('L')}>L</div>
                            <div className={`${size === "XL" && 'active'}`} onClick={ ()=> setSizeHandler('XL')}>XL</div>
                        </div>
                    </div>
                    <div className="quantity-input-box my-3">
                        <button onClick={ ()=> setInputValue('minus')}>-</button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={ ()=> setInputValue('plus')}>+</button>
                    </div>
                    { currentProduct && <p className='text-success mb-0'><FontAwesomeIcon icon={faCheckCircle}/> This item already in your cart</p>}
                    <Row>
                        <div className="col-12 col-md-6">
                            <button onClick={ cartProductHandler } className='btn btn-outline-danger w-100 my-2'><FontAwesomeIcon icon={faCartPlus}/> Add to Cart</button>
                        </div>
                        <div className="col-12 col-md-6">
                            <button onClick={ buyBtnClickHandler } className='btn btn-danger w-100 my-2'>Buy it now</button>
                        </div>
                    </Row>
                </div>
            </Row>
            <div>
                <h5>Details </h5>
                <p>{product.details}</p>
                <p className="my-1">- <span className='fw-bold'>For :</span> {product.for}</p>
                <p className="my-1">- <span className='fw-bold'>Origin :</span> US</p>
                <p className="my-1">- <span className='fw-bold'>Fit :</span> Classic fit</p>
                <p className="my-1">- <span className='fw-bold'>Material :</span> 90/10 Cotton/Spandex</p>
                <p className="my-1">- <span className='fw-bold'>Care & Cleaning :</span> Machine wash & Tumble dry</p>
            </div>
            <div className='my-5'>
                <div className="review-button-container px-2">
                    <div><h4>Reviews</h4></div>
                    <div><Button onClick={ ()=> setReviewBtn(!reviewBtn)} variant="danger">Write a review</Button></div>
                </div>
                {
                    reviewBtn && <Review id={product._id} setReviewBtn={setReviewBtn}/>
                }
                <div className="mt-3">
                    {
                        reviews.map( r => <div className='card my-3 p-3' key={r._id}>
                            <h5>{r.name}</h5>
                            <Rating
                            readonly
                            initialRating={r.rate}
                            fullSymbol={<FontAwesomeIcon className='text-warning' icon={faStar}/>}
                            emptySymbol={<FontAwesomeIcon className='empty-star-icon' icon={regStar}/>}
                            />
                            <p className='mb-0'>{r.comments}</p>
                        </div>)
                    }
                </div>
            </div>
        </Container>
    );
};

export default SingleProduct;