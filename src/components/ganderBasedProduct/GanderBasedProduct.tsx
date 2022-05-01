import React, { useEffect, useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setCategoryBasedProduct } from '../../features/counter/storeSlice';
import { IProduct } from '../../features/Types';
import ProductCard from '../home/productCard/ProductCard';

const GanderBasedProduct = () => {
    const { gander } = useParams();
    const products = useAppSelector( state => state.categoryBasedProducts)
    const [ allProduct, setAllProduct ] = useState<IProduct[]>([])
    const [ filterBtn, setFilterBtn ] = useState<Boolean>(false)
    const [ price, setPrice ] = useState('50');
    const dispatch = useAppDispatch()
    
    useEffect( ()=>{
        dispatch(setCategoryBasedProduct([]))
        fetch(`http://localhost:5000/products-for/${gander}`)
        .then(res=>res.json())
        .then( (data:IProduct[]) => {
            setAllProduct(data)
            dispatch(setCategoryBasedProduct(data))
        })
    },[gander])

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setPrice(e.target.value)
        if(allProduct){
            let newP = [...allProduct].filter(pd=> (pd.price * 0.85) <= parseInt(e.target.value))
            dispatch(setCategoryBasedProduct(newP))
        }
    }
    const onClickHandler = (category:string) =>{
        if(products){
            let newP = [...allProduct].filter(pd=> (pd.category).toLocaleLowerCase() === (category).toLocaleLowerCase() && (pd.price * 0.85) <= parseInt(price) )
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
                <h1 className='category-banner shadow'>{gander}</h1>
            </div>
            <Container className="category-based-product-container">
                <Row className="g-4">
                    <div className="col-md-3 ">
                        <Button onClick={ ()=> setFilterBtn(!filterBtn)} className="category-page-filter-button mx-auto" variant="danger">Filter</Button>
                        <div className={`${ !filterBtn && 'mobile-filter-box'}`}>
                            <h4 className="mt-3">Price($1 -${price})</h4>
                            <input onChange={ onChangeHandler } type="range" min="2" max="50" className="form-range" id="customRange1"/>
                            <div className="my-4">
                                
                                <h4>Category</h4>
                                { gander === "male" && <>
                                        <div onClick={ ()=>onClickHandler('t-shirt')}>
                                    <input className='me-2' type="radio" id="t-shirt" name="fav_language" value="t-shirt"/>
                                    <label htmlFor="t-shirt">T-Shirt</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('jeans')}>
                                    <input className='me-2' type="radio" id="jeans" name="fav_language" value="jeans"/>
                                    <label htmlFor="jeans">Jeans</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('Shirts')}>
                                    <input className='me-2' type="radio" id="Shirts" name="fav_language" value="Shirts"/>
                                    <label htmlFor="Shirts">Shirts</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('Hoodie')}>
                                    <input className='me-2' type="radio" id="Hoodie" name="fav_language" value="Hoodie"/>
                                    <label htmlFor="Hoodie">Hoodie</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('shorts')}>
                                    <input className='me-2' type="radio" id="shorts" name="fav_language" value="shorts"/>
                                    <label htmlFor="shorts">Shorts</label>
                                </div>
                                    </>
                                }
                                { gander === "female" && <>
                                        <div onClick={ ()=>onClickHandler('Dress')}>
                                    <input className='me-2' type="radio" id="Dresses" name="fav_language" value="Dresses"/>
                                    <label htmlFor="Dresses">Dresses</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('tanks')}>
                                    <input className='me-2' type="radio" id="Tanks" name="fav_language" value="Tanks"/>
                                    <label htmlFor="Tanks">Tanks</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('skirt')}>
                                    <input className='me-2' type="radio" id="skirts" name="fav_language" value="skirts"/>
                                    <label htmlFor="skirts">Skirts</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('blouse')}>
                                    <input className='me-2' type="radio" id="blouse" name="fav_language" value="blouse"/>
                                    <label htmlFor="blouse">Blouses</label>
                                </div>
                                 </>
                                }
                                { gander === "kids" && <>
                                        <div onClick={ ()=>onClickHandler('pants')}>
                                    <input className='me-2' type="radio" id="Pants" name="fav_language" value="Pants"/>
                                    <label htmlFor="Pants">Pants</label>
                                </div>
                                <div onClick={ ()=>onClickHandler('shirts')}>
                                    <input className='me-2' type="radio" id="shirts" name="fav_language" value="shirts"/>
                                    <label htmlFor="shirts">Shirts</label>
                                </div>
                                 </>
                                }
                                
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
                            products.length > 0 ? products?.map( pd=> <ProductCard key={pd._id} data={pd} category="category"/>) : <h3 className="text-danger text-center my-5"> No Product Found !</h3>
                        }
                        </Row>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default GanderBasedProduct;