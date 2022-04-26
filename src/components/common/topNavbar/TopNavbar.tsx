import { faBagShopping, faEnvelope, faPhone, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setCartPrice } from '../../../features/counter/storeSlice';
import { ICart } from '../../../features/Types';
import SingleCartProduct from '../../singleCartProduct/SingleCartProduct';
import './topNavbar.css';


const TopNavbar = () => {
    const cart:ICart[] = useAppSelector( state=> state.cart)
    const cartPrice = useAppSelector( state=> state.cartPrice)
    const dispatch = useAppDispatch()
    useEffect( ()=>{
        dispatch(setCartPrice())
    },[])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <div>
            
            <Modal   show={show} onHide={handleClose} animation={false}>
        
        <Modal.Body >
            {
                cart.length > 0 ? cart.map(pd => <SingleCartProduct key={pd._id} data={pd}/>) : <h5 className="text-success">No product in your cart !</h5>
            }
        </Modal.Body>
        {cart.length > 0 && <Modal.Footer className="modal-footer">
          <button className="cart-button-1" >View Cart</button>
          <button className="cart-button-1" >CheckOut</button>
        </Modal.Footer>}
      </Modal>

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
                    <p onClick={handleShow} className="cart-box" title="cart"><FontAwesomeIcon className='me-1' style={{fontSize:"20px"}} icon={faBagShopping}/><sup>{cart.length}</sup><span className='ms-2'>${cartPrice.toFixed(2)}</span></p>
                    <div className='vertical-line me-1'></div>
                    <p><span title="Login in" style={{fontSize:"20px"}}><FontAwesomeIcon icon={faUserCircle}/></span></p>
                    <div className='vertical-line me-1'></div>
                    <p>EN</p>
                    <div className='vertical-line me-1'></div>
                    <p>US($)</p>
               </div>
           </div>
        </div>
    );
};


export default TopNavbar;