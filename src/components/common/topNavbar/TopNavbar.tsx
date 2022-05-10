import { faBagShopping, faEnvelope, faPhone, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setCartPrice } from '../../../features/counter/storeSlice';
import { ICart } from '../../../features/Types';
import useAuth from '../../../hook/useAuth';
import SingleCartProduct from '../../singleCartProduct/SingleCartProduct';
import './topNavbar.css';


const TopNavbar = () => {
    const cart:ICart[] = useAppSelector( state=> state.cart)
    const cartPrice = useAppSelector( state=> state.cartPrice)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect( ()=>{
        dispatch(setCartPrice())
    },[])
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const navigateBtnHandler = (url:string) =>{
        navigate(url)
    }
    return (
        <div>
           <div className="top-nav-container">
               <div className='topNab-contact'>
                <span><FontAwesomeIcon icon={faPhone}/> +8801648308424 </span>
                <span><FontAwesomeIcon icon={faEnvelope}/> dev.abdurrahman01@gmail.com</span>
               </div>
               <div className="topNab-search">
                <InputGroup className="py-1">
                        <FormControl
                        className="topNab-search-box"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Text className="topNab-search-icon" id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                    </InputGroup>
               </div>
               <div className="topNab-other">
               <ul className='top-nav-right'>
                    <li onClick={handleShow} className="cart-box" title="cart">
                            <FontAwesomeIcon icon={faBagShopping}/>
                            <sup>{cart.length}</sup>
                            <span style={{fontSize:"14px"}} className='ms-2'> ${cartPrice.toFixed(2)} </span>
                        <div className="cart-dropdown shadow">
                        <div className="cart-product-section p-2">
                        {
                            cart.length > 0 ? cart.map(pd => <SingleCartProduct key={pd._id} data={pd}/>) : <h5 className="text-success text-center">No product in your cart !</h5>
                        }
                        </div>
                        <div className="cart-button-section">
                            <Link to="/checkout"><button className="cart-button-1">View Cart</button></Link>
                        </div>
                        </div>
                    </li>
                    <li className='text-center'>
                        <Link className="text-white" to="/user-profile"><p>{ user?.photoURL ? <img className='profile-pic' src={user.photoURL} alt="profile" /> : <span className='profile-pic' title="Profile" ><FontAwesomeIcon icon={faUserCircle}/></span> }</p></Link>
                    </li>
                    
                    <li className='text-center'>
                        <p>EN</p>
                    </li>
                    
                    <li className='text-center'>
                        <p>US($)</p>
                    </li>
               </ul>
               </div>
           </div>
        </div>
    );
};


export default TopNavbar;