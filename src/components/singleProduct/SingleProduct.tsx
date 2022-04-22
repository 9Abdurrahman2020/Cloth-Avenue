import { faCheckCircle, faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCartProduct } from '../../features/counter/storeSlice';
import { IProduct } from '../../features/Types';
import Review from '../common/review/Review';
import './singleProduct.css';

const SingleProduct = () => {
    const { id } = useParams<string>();
    const [ product, setProduct ] = useState<IProduct>();
    const [ size, setSize ] = useState<string>('s');
    const [ quantity, setQuantity ] = useState<number>(1);  
    const dispatch = useAppDispatch() ;
    const cartProduct = useAppSelector( (state)=>state.clothStore.cart );
    const [ currentProduct, setCurrentProduct ] = useState<Boolean>(false)
    const [ reviewBtn, setReviewBtn ] = useState<Boolean>(false)
    useEffect( ()=>{
        fetch(`http://localhost:5000/product/${id}`)
        .then(res=>res.json())
        .then( (data:IProduct) => setProduct(data))
    },[])
    useEffect( ()=>{
        const thisProduct = cartProduct.find( pd=> pd._id === id)
        if(thisProduct){
            setCurrentProduct(true)
            setQuantity(thisProduct.quantity)
            setSize(thisProduct.size)
        }
    },[])
    if(!product){
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
            }
        }else if(operator === 'plus'){
            if(quantity< product.stock){
                setQuantity(quantity+1)
            }else{
                toast(`Sorry only ${product.stock} items in our stock !`)
            }
        }
    }
    
    return (
        <Container className="">
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
                            <div className={`${size === "s" && 'active'}`} onClick={ ()=> setSize('s')}>S</div>
                            <div className={`${size === "m" && 'active'}`} onClick={ ()=> setSize('m')}>M</div>
                            <div className={`${size === "l" && 'active'}`} onClick={ ()=> setSize('l')}>L</div>
                            <div className={`${size === "xl" && 'active'}`} onClick={ ()=> setSize('xl')}>XL</div>
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
                            <button onClick={ ()=> dispatch(setCartProduct({...product,quantity,size}))} className='btn btn-outline-danger w-100 my-2'><FontAwesomeIcon icon={faCartPlus}/> Add to Cart</button>
                        </div>
                        <div className="col-12 col-md-6">
                            <button className='btn btn-danger w-100 my-2'>Buy it now</button>
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
                <div className="review-button-container">
                    <div><h4>Reviews</h4></div>
                    <div><Button onClick={ ()=> setReviewBtn(!reviewBtn)} variant="danger">Write a review</Button></div>
                </div>
                {
                    reviewBtn && <Review setReviewBtn={setReviewBtn}/>
                }
                <div className="mt-3">
                    This is an awesome product !
                </div>
            </div>
        </Container>
    );
};

export default SingleProduct;