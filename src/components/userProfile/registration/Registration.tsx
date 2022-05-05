import { faEnvelope, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';

const Registration = () => {
    interface IRegistration {
        [key: string]: any
    }
    const [ inputData, setInputData ] = useState<IRegistration>({});
    const { registerUser, error } = useAuth()
    

    const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>) =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInputData = { ...inputData }
        newInputData[field] = value ;
        setInputData(newInputData)
    }

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        registerUser(inputData)
    }
    console.log(error);

    return (
        <div className='login-container'>
            <Row className="inner-login-container">
                <div className="col-lg-6 image-container">
                    <img src="https://i.ibb.co/TtqGrbh/loign-img.jpg" alt="" />
                </div>
                <div className="col-lg-6 login-input-container">
                    <h2 className='my-4'>REGISTER</h2>
                    <form onSubmit={ handleFormSubmit }>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUserCircle}/></span>
                            <input onBlur={ handleOnBlur } type="text" className="form-control" name="name" placeholder="Full Name" aria-label="name" aria-describedby="basic-addon1" required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                            <input onBlur={ handleOnBlur } type="email" className="form-control" name="email" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faKey}/></span>
                            <input onBlur={ handleOnBlur } type="password" className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required/>
                        </div>
                        <p style={{textAlign:'left'}}>Already have an Account ? <Link style={{textDecoration:'none'}} to="/user-profile/login">Login <i className="fas fa-arrow-right"></i></Link></p>
                        <span className="text-danger">{error}</span>
                        <input className='btn btn-success login-button' type="submit" value="Register" />
                    </form>
                </div>
            </Row>
        </div>
    );
};

export default Registration;