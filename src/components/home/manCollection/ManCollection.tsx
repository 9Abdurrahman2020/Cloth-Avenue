import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProduct, setMenProduct, setMenSelectedCategory, setWomenProduct } from '../../../features/counter/storeSlice';
import { IProduct, TMenSelectedCategory } from '../../../features/Types';
import ProductCard from '../productCard/ProductCard';

const MenCollections = () => {
    
    const dispatch = useAppDispatch();
    const products:IProduct[] = useAppSelector( state => state.store.products);
    const selectedProduct:IProduct[] = useAppSelector( state => state.store.men);
    const curProduct:TMenSelectedCategory = useAppSelector( state => state.store.menSelectedCategory);

    useEffect( ()=>{
        dispatch(fetchProduct());
    },[])
    useEffect( ()=>{
        dispatch(setWomenProduct());
    },[products])
    const handleCategorySelector = (selected:TMenSelectedCategory) =>{
        dispatch(setMenSelectedCategory(selected))
        dispatch(setMenProduct());
    }
    return (
        <Container className="my-5">
            <h2>Men's Collection</h2>
            <div className="tab-container">
                <p className={`${curProduct === 'jeans' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("jeans") }>Jeans</p>
                <p className={`${curProduct === 't-shirt' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("t-shirt")}>T-Shirts</p>
                <p className={`${curProduct === 'hoodie' && 'c-w-category'}`} onClick={ ()=> handleCategorySelector("hoodie")}>Hoodies</p>
            </div>
            <Row className="g-4">
                {
                  selectedProduct.slice(0,4).map( (p) => <ProductCard key={p.id} data={p}/>)
                }
            </Row>
        </Container>
    );
};

export default MenCollections;