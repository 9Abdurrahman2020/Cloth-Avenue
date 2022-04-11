import { faBagShopping, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo/logo.png';
import './navigation.css';
const Navigation = () => {
    const [activeNav, setActiveNav ] = useState<Boolean>(false);
    return (
           <div>
                <div className='navigation-container'>
                    <div className="logo"><img src={logo} alt="" /></div>
                    <ul className='nav-links'>
                        <li>
                            <Link to="/">Men's</Link>
                        </li>
                        <li>
                            <Link to="/">Women's</Link>
                        </li>
                        <li>
                            <Link to="/">Kid's</Link>
                        </li>
                    </ul>
                </div>

                <div className="responsive-nav-container">
                <div className="topNab-search2">
                <InputGroup className="py-1">
                        <FormControl
                        className="topNab-search-box2"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text className="topNab-search-icon2" id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup>
               </div>
               <span className='mobile ms-3' title="cart"><FontAwesomeIcon className='me-1' style={{fontSize:"20px"}} icon={faBagShopping}/><sup>0</sup></span>
                    <span className='mobile' title="Login in" style={{fontSize:"20px"}}><FontAwesomeIcon icon={faUserCircle}/></span>
                    <div onClick={ ()=> setActiveNav(!activeNav) } className={`burger ${activeNav && 'toggle'}`}>
                        <div className='line1'></div>
                        <div className='line2'></div>
                        <div className='line3'></div>
                    </div>
                </div>
                <div className={`responsive-nav-menu ${activeNav && 'active-nav'}`}>
                    <h1>Men's</h1>
                    <h1>Woman's</h1>
                    <h1>Kid's</h1>
                </div>
           </div>
    );
};

export default Navigation;