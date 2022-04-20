import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import './filterProduct.css';

const FilterProduct = () => {
    interface ISearch{
        [key: string ]: string
    }
    const [ department, setDepartment ] = useState<string>();
    const [ searchData, setSearchData ] = useState<ISearch>({});
    const handleSetDepartment  = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
        setDepartment(e.target.value)
        onChangeHandler(e)
    }
    const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
        const name:string = e.target.name;
        const value:string = e.target.value;
        const newData:{ [key: string]: string } = {...searchData};
        newData[name] = value;
        setSearchData(newData)
    }
    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>):void =>{
        e.preventDefault()
        console.log(searchData);
    }
    return (
        <div className='filter-product-container p-5 my-5'>
            <Container>
                <h1>Summer was made for exploring the world !</h1>
                <h4>Find the perfect outfit for it</h4>
                <form onSubmit={onSubmitHandler} className='row'>
                    <div className="col-12 col-md-4">
                    <Form.Group className="mb-3">
                        <Form.Select onChange={handleSetDepartment} defaultValue="" required name="department">
                            <option value="" disabled style={{display:"none"}}>Department...</option>
                            <option value="Man's">Man's</option>
                            <option value="Women's">Women's</option>
                            <option value="Kid's">Kid's</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="col-12 col-md-4">
                    <Form.Group className="mb-3">
                        <Form.Select onChange={onChangeHandler} defaultValue="1" name="type" disabled={ !department && true}>
                            <option value="1" disabled style={{display:"none"}}>Product Type...</option>
                            { department === "Man's" && <>
                            <option>T-Shirt</option> 
                            <option>Shorts</option>
                            <option>Jeans</option> 
                            <option>Shirt</option> 
                            </> }
                            { department === "Women's" && <>
                            <option>Dress</option> 
                            <option>Tanks</option>
                            <option>Blouse</option> 
                            <option>Skirt</option> 
                            </> }
                            { department === "Kid's" && <>
                            <option>Pants</option> 
                            <option>Shirts</option>
                            </> }
                        </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="col-12 col-md-4">
                    <Form.Group className="mb-3">
                        <Form.Select onChange={onChangeHandler} defaultValue="1" name="brand" disabled={ !department && true}>
                            <option value="1" disabled style={{display:"none"}}>Brand...</option>
                            <option>Copper Thompson</option>
                            <option>Keystone</option>
                            <option>KD</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="col-12">
                        <button className='search-button' type="submit">Search</button>
                    </div>
                </form>
            </Container>
        </div>
    );
};

export default FilterProduct;