import { faHeadset, faMaskFace, faPeopleCarryBox, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Row } from 'react-bootstrap';

const ServiceDemo = () => {
    return (
        <Container>
            <Row className="my-5 text-center g-3">
                <div className="col-6 col-lg-3">
                    <FontAwesomeIcon style={{fontSize:"50px"}} icon={faMaskFace}/>
                    <p>COVID Precautions</p>
                </div>
                <div className="col-6 col-lg-3">
                <FontAwesomeIcon style={{fontSize:"50px"}} icon={faTruckFast}/>
                    <p>Free shipping</p>
                </div>
                <div className="col-6 col-lg-3">
                <FontAwesomeIcon style={{fontSize:"50px"}} icon={faPeopleCarryBox}/>
                    <p>Easy Returns</p>
                </div>
                <div className="col-6 col-lg-3">
                <FontAwesomeIcon style={{fontSize:"50px"}} icon={faHeadset}/>
                    <p>Online Support</p>
                </div>
            </Row>
        </Container>
    );
};

export default ServiceDemo;