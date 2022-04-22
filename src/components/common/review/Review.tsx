import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Rating from 'react-rating';

const Review = ({setReviewBtn}:{setReviewBtn:any}) => {
    interface IReview {
        [key: string]: any
    }
    const [ reviewData, setReviewData ] = useState<IReview>();
    const [ rating, setRating ] = useState(0)
    const onBlurHandler = (e:React.FocusEvent<HTMLInputElement>):void=>{
        const name:string = e.target.name;
        const value:string = e.target.value;
        const newData = {...reviewData}
        newData[name] = value;
        setReviewData(newData)
    }
    const handleRatingChange = (value:number)=> {
        setRating(value)
        setReviewData({...reviewData, rate:value})
        
    }
    const handleOnSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(reviewData);
        setReviewBtn(false)
    }
    
    return (
        <div className='my-4'>
            <form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onBlur={ onBlurHandler } type="text" name="name" placeholder="Enter your name" required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onBlur={ onBlurHandler } type="email" name="email" placeholder="Enter your email" required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Body of review</Form.Label>
                <FormControl onBlur={ onBlurHandler } style={{height:"150px"}} name="comments" placeholder='Write your comments here' as="textarea" aria-label="With textarea" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Rating</Form.Label> <br />
                <Rating
                initialRating={rating}
                fractions={10}
                onChange={ handleRatingChange }
                fullSymbol={<FontAwesomeIcon className='text-warning' icon={faStar}/>}
                emptySymbol={<FontAwesomeIcon className='text-secondary' icon={regStar}/>}
                />
            </Form.Group>
                <Button type="submit" variant="danger">Submit</Button>
            </form>
        </div>
    );
};

export default Review;