import { faBagShopping, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/store';
import logo from '../../../images/logo/logo.png';
import SingleCartProduct from '../../singleCartProduct/SingleCartProduct';
import './navigation.css';
const Navigation = () => {
    const [activeNav, setActiveNav ] = useState<Boolean>(false);
    const cart = useAppSelector(state=> state.cart)
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();

    
    const navigateBtnHandler = (url:string) =>{
        navigate(url)
    }
    return (
           <div>
               
                <div className='navigation-container'>
                    <Link to="/"><div className="logo"><img src={logo} alt="" /></div></Link>
                    <ul className='nav-links'>
                        <li className="list-1">
                            <h5>Men's</h5>
                            <div className="nab-dropdown">
                                <li><Link to="/products/t-shirt">T-Shirt</Link></li>
                                <li><Link to="/products/jeans">Jeans</Link></li>
                                <li><Link to="/products/shirts">Shirt</Link></li>
                                <li><Link to="/products/shorts">Shorts</Link></li>
                            </div>
                        </li>
                        <li>
                            <h5>Women's</h5>
                            <div className="nab-dropdown">
                                <li><Link to="/products/dress">Dresses</Link></li>
                                <li><Link to="/products/tanks">Tanks</Link></li>
                                <li><Link to="/products/skirt">Skirts</Link></li>
                                <li><Link to="/products/blouse">Blouses</Link></li>
                            </div>
                        </li>
                        <li>
                            <h5>Kid's</h5>
                            <div className="nab-dropdown">
                                <li><Link to="/products/pants">Pants</Link></li>
                                <li><Link to="/products/shirts">shirts</Link></li>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="row g-4 responsive-nav-container">
                <div className="col-7 topNab-search2">
                <InputGroup className="py-1 w-100">
                        <FormControl
                        className="topNab-search-box2"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text className="topNab-search-icon2" id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup>
               </div>
               <div className='mobile-nav-right-part col-5'>
               <div>
                <p onClick={ ()=> setShow(!show)} className={`mobile my-0`} title="cart"><FontAwesomeIcon className='me-1' style={{fontSize:"20px"}} icon={faBagShopping}/><sup>{cart.length}</sup></p>
                <div className={`cart-mobile-dropdown shadow ${show && 'cart-active'}`}>
                    <div className="cart-product-section">
                    {
                        cart.length > 0 ? cart.map(pd => <SingleCartProduct key={pd._id} data={pd}/>) : <h5 className="text-success text-center">No product in your cart !</h5>
                    }
                    </div>
                    <div className="cart-button-section">
                        <Link to="/checkout"><button className="cart-button-1">View Cart</button></Link>
                    </div>
                </div>
               </div>
               <div>
                   <Link style={{color:'#6b6f81'}} to="/user-profile"><span className='mobile' title="Login in" style={{fontSize:"20px"}}><FontAwesomeIcon icon={faUserCircle}/></span></Link>
                </div>
                <div onClick={ ()=> setActiveNav(!activeNav) } className={`burger ${activeNav && 'toggle'}`}>
                    <div className='line1'></div>
                    <div className='line2'></div>
                    <div className='line3'></div>
                </div>
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