import { faBagShopping, faEnvelope, faPhone, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import './topNavbar.css';


const TopNavbar = () => {
    

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
                    <p title="cart"><FontAwesomeIcon className='me-1' style={{fontSize:"20px"}} icon={faBagShopping}/><sup>0</sup><span className='ms-2'>$0</span></p>
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