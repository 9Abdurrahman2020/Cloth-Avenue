import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCategoryBasedProduct } from '../../features/counter/storeSlice';
import { IProduct } from '../../features/Types';
import ProductCard from '../home/productCard/ProductCard';
import './categoryBasedProducts.css';


const CategoryBasedProduct = () => {
    const {category} = useParams();
    const products = useAppSelector( state => state.categoryBasedProducts)
    const [ allProduct, setAllProduct ] = useState<IProduct[]>([])
    const [ price, setPrice ] = useState('50');
    const dispatch = useAppDispatch()
    
    useEffect( ()=>{
        dispatch(setCategoryBasedProduct([]))
        fetch(`http://localhost:5000/products/${category}`)
        .then(res=>res.json())
        .then( (data:IProduct[]) => {
            setAllProduct(data)
            dispatch(setCategoryBasedProduct(data))
        })
    },[])

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setPrice(e.target.value)
        if(allProduct){
            let newP = allProduct.filter(pd=> (pd.price * 0.85).toString() <= (e.target.value))
            dispatch(setCategoryBasedProduct(newP))
        }
    }
    const onClickHandler = (brand:string) =>{
        if(products){
            let newP = allProduct.filter(pd=> (pd.brand).toLocaleLowerCase() === (brand).toLocaleLowerCase() && (pd.price * 0.85).toString() <= price )
            dispatch(setCategoryBasedProduct(newP))
        }
    }
    if(!allProduct.length){
        return (
            <div className="loading-image-container">
                <img width="200px" src="https://cdn.dribbble.com/users/408943/screenshots/2887008/media/5292aff30094d74fffd87a0dba58fa4e.gif"></img>
            </div>
        )
    }
    
    
    return (
        <div>
            <div>
                <h1 className='category-banner shadow'>{category}</h1>
            </div>
            <Container className="category-based-product-container">
                <Row className="g-4">
                    <div className="col-md-3">
                    <div className="App">
                    </div>
                        <h4>Price($1 -${price})</h4>
                        <input onChange={ onChangeHandler } type="range" min="2" max="50" className="form-range" id="customRange1"/>
                        <div className="my-4">
                            <h4>Brand</h4>
                            <div onClick={ ()=>onClickHandler('KD')}>
                                <input className='me-2' type="radio" id="kd" name="fav_language" value="KD"/>
                                <label htmlFor="kd">KD</label>
                             </div>
                             <div onClick={ ()=>onClickHandler('Keystone')}>
                                <input className='me-2' type="radio" id="Keystone" name="fav_language" value="Keystone"/>
                                <label htmlFor="Keystone">Keystone</label>
                             </div>
                             <div onClick={ ()=>onClickHandler('Copper Thompson')}>
                                <input className='me-2' type="radio" id="Copper Thompson" name="fav_language" value="Copper Thompson"/>
                                <label htmlFor="Copper Thompson">Copper Thompson</label>
                             </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="category-discount-banner">
                            <h2>EXTRA 25% OFF</h2>
                            <h5>+ Free Shipping</h5>
                            <p>When you open and shop with your new <br />Avenue Rewards Credit Card</p>
                        </div>
                        <Row>
                            {
                                products?.map( pd=> <ProductCard key={pd._id} data={pd} category={category}/>)
                            }
                        </Row>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default CategoryBasedProduct;