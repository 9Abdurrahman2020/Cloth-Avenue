import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    interface ILogin {
        [key: string]: any
    }

    const [ inputData, setInputData ] = useState<ILogin>({});

    const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>) =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInputData = { ...inputData }
        newInputData[field] = value ;
        setInputData(newInputData)
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
    }
    return (
        <div className='login-container'>
            <Row className="inner-login-container">
                <div className="col-lg-6 image-container">
                    <img src="https://i.ibb.co/TtqGrbh/loign-img.jpg" alt="" />
                </div>
                <div className="col-lg-6 login-input-container">
                    <h2 className='my-4'>LOGIN</h2>
                    <form onSubmit={ handleFormSubmit }>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                            <input onBlur={ handleOnBlur } type="email" className="form-control" name="email" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" required/>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faKey}/></span>
                            <input onBlur={ handleOnBlur } type="password" className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required/>
                        </div>
                        <p style={{textAlign:'left'}}>New ? <Link style={{textDecoration:'none'}} to="/user-profile/registration">Create an account <i className="fas fa-arrow-right"></i></Link></p>
                        <span className="text-danger">{''}</span>
                        <input className='btn btn-success login-button' type="submit" value="Login" />
                    </form>
                    <div>
                        <p className="my-3">or</p>
                        <Button variant="danger"><i className="fab fa-google"></i> Sign in with Google</Button>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default Login;