import { faBagShopping, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';
import logo from '../../../images/logo/logo.png';
import './navigation.css';
const Navigation = () => {
    const [activeNav, setActiveNav ] = useState<Boolean>(false);
    const cartLength = useAppSelector(state=> state.cart.length)
    return (
           <div>
                <div className='navigation-container'>
                    <Link to="/"><div className="logo"><img src={logo} alt="" /></div></Link>
                    <ul className='nav-links'>
                        <li className="list-1">
                            <h5>Men's</h5>
                            <ul className="nab-dropdown">
                                <li><Link to="/products/t-shirt">T-Shirt</Link></li>
                                <li><Link to="/products/jeans">Jeans</Link></li>
                                <li><Link to="/products/shirts">Shirt</Link></li>
                                <li><Link to="/products/shorts">Shorts</Link></li>
                            </ul>
                        </li>
                        <li>
                            <h5>Women's</h5>
                            <ul className="nab-dropdown">
                                <li><Link to="/products/dress">Dresses</Link></li>
                                <li><Link to="/products/tanks">Tanks</Link></li>
                                <li><Link to="/products/skirt">Skirts</Link></li>
                                <li><Link to="/products/blouse">Blouses</Link></li>
                            </ul>
                        </li>
                        <li>
                            <h5>Kid's</h5>
                            <ul className="nab-dropdown">
                                <li><Link to="/products/pants">Pants</Link></li>
                                <li><Link to="/products/shirts">shirts</Link></li>
                            </ul>
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
               <pre className='mobile ms-3' title="cart"><FontAwesomeIcon className='me-1' style={{fontSize:"20px"}} icon={faBagShopping}/><sup>{cartLength}</sup></pre>
               
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