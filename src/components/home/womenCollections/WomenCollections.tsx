import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setWomenProduct, setWomenSelectedCategory } from '../../../features/counter/storeSlice';
import { IProduct, TStatus, TWomenSelectedCategory } from '../../../features/Types';
import ProductCard from '../productCard/ProductCard';
import './womenCollections.css';
const WomenCollections = () => {
    
    const dispatch = useAppDispatch();
    const products:IProduct[] = useAppSelector( state => state.products);
    const status:TStatus = useAppSelector( state => state.status);
    const selectedProduct:IProduct[] = useAppSelector( state => state.women);
    const curProduct:TWomenSelectedCategory = useAppSelector( state => state.womenSelectedCategory);

    useEffect( ()=>{
        dispatch(setWomenProduct());
    },[products])
    const handleCategorySelector = (selected:TWomenSelectedCategory) =>{
        dispatch(setWomenSelectedCategory(selected))
        dispatch(setWomenProduct());
    }
    return (
        <Container className="my-5">
            <h2>Women's Collection</h2>
            { status === 'successful' && <>
                <div className="tab-container">
                <p className={`${curProduct === 'dress' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("dress") }>Dresses</p>
                <p className={`${curProduct === 'tanks' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("tanks")}>Tanks</p>
                <p className={`${curProduct === 'skirt' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("skirt")}>Skirts</p>
            </div>
            <Row className="g-4">
                {
                  selectedProduct.slice(0,4).map( (p) => <ProductCard key={p.id} data={p}/>)
                }
            </Row>
            </> }
        </Container>
    );
};

export default WomenCollections;