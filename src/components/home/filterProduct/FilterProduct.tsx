import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import './filterProduct.css';

const FilterProduct = () => {
    interface ISearch{
        [key: string ]: string
    }
    const [ department, setDepartment ] = useState<string>();
    const [ searchData, setSearchData ] = useState<ISearch>({});
    const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setDepartment(e.target.value)
        const name:string = e.target.name;
        const value:string = e.target.value;
        const newData:{ [key: string]: string } = {...searchData};
        newData[name] = value;
        setSearchData(newData)
    }
    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>)=>{
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
                        <Form.Select onChange={onChangeHandler} defaultValue="" required name="department">
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
                            <option>T-Shirt</option>
                            <option>Pants</option>
                            <option>Jeans</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="col-12 col-md-4">
                    <Form.Group className="mb-3">
                        <Form.Select onChange={onChangeHandler} defaultValue="1" name="color" disabled={ !department && true}>
                            <option value="1" disabled style={{display:"none"}}>Color...</option>
                            <option>White</option>
                            <option>Black</option>
                            <option>Red</option>
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