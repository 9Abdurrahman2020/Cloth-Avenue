import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import './userProfile.css';

const UserProfile = () => {
    const [ navActive, setNavActive ] = useState<string>('my-account')
    return (
        <div className="user-profile-container">
        <Container>
            <h2 className='py-4 text-capitalize'>{navActive}</h2>
            <Row className="g-4">
            <div className="col-md-2 user-menu-container">
                <ul className="profile-menu p-0">
                    <Link to="/user-profile">
                        <li onClick={ ()=> setNavActive('my-account')} className={`mt-0 ${navActive === 'my-account' && 'nav-active'}`}><FontAwesomeIcon icon={faUserCircle}/> Account</li>
                    </Link>
                    <Link to="/user-profile/my-orders">
                        <li onClick={ ()=> setNavActive('my-orders')} className={`${navActive === 'my-orders' && 'nav-active'}`}><FontAwesomeIcon icon={faBagShopping}/> My Orders</li>
                    </Link>
                    <li ><FontAwesomeIcon icon={faSignOut}/> Logout</li>
                </ul>
            </div>
            <div className={`burger`}>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
            <div className="user-profile-content col-md-10 p-3">
                <Outlet/>
            </div>
            </Row>
        </Container>
        </div>
    );
};

export default UserProfile;