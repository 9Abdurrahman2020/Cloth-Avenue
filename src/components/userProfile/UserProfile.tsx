import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faSignOut, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import './userProfile.css';

const UserProfile = () => {
    const [ navActive, setNavActive ] = useState<string>('my-account');
    const [activeNav, setActiveNav ] = useState<Boolean>(false);
    const { logOut, role } = useAuth();
    const cartRef = useRef<HTMLDivElement>(null);
    const logOutHandler = () =>{
        logOut()
        setNavActive('logout')
    }
    useEffect( ()=>{
        const handler = (event:any)=>{
            if(!cartRef.current?.contains(event.target)){
                setActiveNav(false)
            }
        }
            document.addEventListener('mousedown', handler);
            return ()=> {
                document.removeEventListener('mousedown', handler)
            }
        })
    return (
        <div className="user-profile-container">
        <Container className="py-2">
        <div onClick={ ()=> setActiveNav(!activeNav) } className={`burger ${activeNav && 'toggle'}`}>
                <div className='line1'></div>
                <div className='line2'></div>
                <div className='line3'></div>
            </div>
            <div ref={cartRef} className={`mobile-userProfile-menu ${activeNav && 'mobile-userProfile-show'}`}>
            <Row>
                <div className="col-10">
                <ul className="profile-menu p-0">
                    <Link to="/user-profile">
                        <li onClick={ ()=> setNavActive('my-account')} className={`mt-0 ${navActive === 'my-account' && 'nav-active'}`}><FontAwesomeIcon icon={faUserCircle}/> Account</li>
                    </Link>
                    <Link to="/user-profile/my-orders">
                        <li onClick={ ()=> setNavActive('my-orders')} className={`${navActive === 'my-orders' && 'nav-active'}`}><FontAwesomeIcon icon={faBagShopping}/> My Orders</li>
                    </Link>
                    {
                        role === 'admin' && <Link to="/user-profile/make-admin">
                        <li onClick={ ()=> setNavActive('make-admin')} className={`${navActive === 'make-admin' && 'nav-active'}`}><FontAwesomeIcon icon={faUserGear}/> Make Admin</li>
                    </Link>
                    }
                    <Link to="/user-profile/logout">
                        <li onClick={ logOutHandler } className={`${navActive === 'logout' && 'nav-active'}`} ><FontAwesomeIcon icon={faSignOut}/> Logout</li>
                    </Link>
                </ul>
                </div>
                <div className="col-2">
                <div onClick={ ()=> setActiveNav(!activeNav) } className={`burger ${activeNav && 'toggle'} targer`}>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
                </div>
            </Row>
            </div>
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
                    {
                        role === 'admin' && <Link to="/user-profile/make-admin">
                        <li onClick={ ()=> setNavActive('make-admin')} className={`${navActive === 'make-admin' && 'nav-active'}`}><FontAwesomeIcon icon={faUserGear}/> Make Admin</li>
                    </Link>
                    }
                    <Link to="/user-profile/logout">
                        <li onClick={ logOutHandler } className={`${navActive === 'logout' && 'nav-active'}`} ><FontAwesomeIcon icon={faSignOut}/> Logout</li>
                    </Link>
                </ul>
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