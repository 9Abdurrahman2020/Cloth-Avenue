import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProduct, setWomenProduct, setWomenSelectedCategory } from '../../../features/counter/storeSlice';
import { IProduct, TWomenSelectedCategory } from '../../../features/Types';
import ProductCard from '../productCard/ProductCard';
import './womenCollections.css';
const WomenCollections = () => {
    
    const dispatch = useAppDispatch();
    const products:IProduct[] = useAppSelector( state => state.store.products);
    const selectedProduct:IProduct[] = useAppSelector( state => state.store.women);
    const curProduct:TWomenSelectedCategory = useAppSelector( state => state.store.womenSelectedCategory);

    useEffect( ()=>{
        dispatch(fetchProduct());
    },[])
    useEffect( ()=>{
        dispatch(setWomenProduct());
    },[products])
    const handleCategorySelector = (selected:string) =>{
        dispatch(setWomenSelectedCategory(selected))
        dispatch(setWomenProduct());
    }
    return (
        <Container className="my-5">
            <h2>Women's Collection</h2>
            <div className="tab-container">
                <p className={`${curProduct === 'dress' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("dress") }>Dresses</p>
                <p className={`${curProduct === 'tanks' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("tanks")}>Tanks</p>
                <p className={`${curProduct === 'skirt' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("skirt")}>Skirts</p>
            </div>
            <Row>
                {
                    selectedProduct.slice(0,4).map( (p) => <ProductCard key={`${p.id+p.title}`} data={p}/>)
                }
            </Row>
        </Container>
    );
};

export default WomenCollections;