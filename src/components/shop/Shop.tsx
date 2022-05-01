import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../app/store';
import { setCategoryBasedProduct } from '../../features/counter/storeSlice';
import { IProduct, ISearch } from '../../features/Types';
import ProductCard from '../home/productCard/ProductCard';


const Shop = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [ allProduct, setAllProduct ] = useState<IProduct[]>([]);
    const [ filterBtn, setFilterBtn ] = useState<Boolean>(false);
    const [ department, setDepartment ] = useState<string>(' ');
    const [ searchData, setSearchData ] = useState<ISearch>({price: "50"});
    const dispatch = useAppDispatch();
    
    useEffect( ()=>{
        dispatch(setCategoryBasedProduct([]))
        fetch(`http://localhost:5000/products`)
        .then(res=>res.json())
        .then( (data:IProduct[]) => {
            setProducts(data)
            setAllProduct(data)
        })
    },[]);

    useEffect( ()=>{
        if(searchData.brand){
            setProducts(allProduct.filter(p=> p.for.toLowerCase() === searchData.department?.toLowerCase() && p.category?.toLowerCase() === searchData.type?.toLowerCase() && p.brand.toLowerCase() === searchData.brand?.toLowerCase() && p.price <= parseInt(searchData.price)))
        }
        else if(searchData.type){
            setProducts(allProduct.filter(p=> p.for.toLowerCase() === searchData?.department.toLowerCase() && p.category.toLowerCase() === searchData.type?.toLowerCase() && p.price <= parseInt(searchData.price)))
        }
        else if(searchData.department){
            const newProducts = allProduct.filter(p=> (p.for.toLowerCase() === searchData.department?.toLowerCase()) && (p.price <= parseInt(searchData.price)))
            setProducts(newProducts)
        }
        else if(searchData.price){
            setProducts(allProduct.filter(p=> p.price <= parseInt(searchData.price)))
        }
        
    },[allProduct,searchData])

    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        setSearchData({...searchData, price: e.target.value})
    }
   
    const handleSetDepartment  = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
        setDepartment(e.target.value)
        onInputChangeHandler(e)
    }
    const onInputChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
        const name:string = e.target.name;
        const value:string = e.target.value;
        const newData:{ [key: string]: string } = {...searchData};
        newData[name] = value;
        setSearchData(newData)
    }

    if(!allProduct.length){
        return (
            <div className="loading-image-container">
                <img width="200px" src="https://cdn.dribbble.com/users/408943/screenshots/2887008/media/5292aff30094d74fffd87a0dba58fa4e.gif"></img>
            </div>
        )
    }
    console.log(searchData);
    
    return (
        <div>
            <div>
                <h1 className='category-banner shadow'>All Products</h1>
            </div>
            <Container className="category-based-product-container">
                <Row className="g-4">
                    <div className="col-md-3 ">
                        <Button onClick={ ()=> setFilterBtn(!filterBtn)} className="category-page-filter-button mx-auto" variant="danger">Filter</Button>
                        <div className={`${ !filterBtn && 'mobile-filter-box'}`}>
                            <h4 className='mt-3'>Price($1 -${searchData.price})</h4>
                            <input onChange={ onChangeHandler } type="range" min="2" max="50" className="form-range" id="customRange1" name='price'/>
                            <div className="my-4">
                                <h5 className="mt-4">Department</h5>
                            <Form.Group className="mb-3">
                                <Form.Select onChange={handleSetDepartment} defaultValue={department} required name="department">
                                    <option value=" " disabled style={{display:"none"}}>Department...</option>
                                    <option value="male">Man's</option>
                                    <option value="female">Women's</option>
                                    <option value="kids">Kid's</option>
                                </Form.Select>
                            </Form.Group>
                                
                                <h5 className="mt-4">Product Type</h5>
                                <Form.Group className="mb-3">
                                    <Form.Select onChange={onInputChangeHandler} defaultValue={`${searchData?.type ? searchData?.type : ''}`} name="type" required>
                                    <option value="" disabled style={{display:"none"}}>Product Type...</option>
                                    { department === "male" && <>
                                    <option value="t-shirt">T-Shirt</option> 
                                    <option value="shorts">Shorts</option>
                                    <option value="jeans">Jeans</option> 
                                    <option value="shirts">Shirt</option> 
                                    <option value="hoodie">Hoodie</option> 
                                    </> }
                                    { department === "female" && <>
                                    <option value="tanks">Tanks</option>
                                    <option value="dress">Dress</option> 
                                    <option value="blouse">Blouse</option> 
                                    <option value="skirt">Skirt</option> 
                                    </> }
                                    { department === "kids" && <>
                                    <option value="pants">Pants</option> 
                                    <option value="shirts">Shirts</option>
                                    </> }
                                    </Form.Select>
                                </Form.Group>
                                    <h5 className="mt-4">Brand</h5>
                                <Form.Group className="mb-3">
                                    <Form.Select onChange={onInputChangeHandler} defaultValue={`${searchData?.brand ? searchData?.brand : ''}`} name="brand" disabled={ !department && true} required>
                                        <option value="" disabled style={{display:"none"}}>Brand...</option>
                                        <option value="copper thompson">Copper Thompson</option>
                                        <option value="keystone">Keystone</option>
                                        <option value="kd">KD</option>
                                    </Form.Select>
                                </Form.Group>
                                
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

export default Shop;