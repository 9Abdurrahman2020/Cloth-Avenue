import { faCheckCircle, faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import InnerImageZoom from 'react-inner-image-zoom';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store';
import { setCartPrice, setCartProduct } from '../../../features/counter/storeSlice';
import { IProduct } from '../../../features/Types';
import './productCard.css';

const  ProductCard = ({data, category}:{data:IProduct, category?:string}) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const discountPrice:number = (data.price * .85);
  const [ size, setSize ] = useState<string>('S');
  const [ quantity, setQuantity ] = useState<number>(1);
  const [ currentProduct, setCurrentProduct ] = useState<Boolean>(false)
  
  let price:number = data.price;
    if(data.price>12){
       price = (data.price * .85);
    }
    const setInputValue = (operator:string) =>{
      if(operator === 'minus'){
          if(quantity>1){
              setQuantity(quantity-1)
              if(currentProduct){
                  dispatch(setCartProduct({...data,price:parseFloat(price.toFixed(2)),quantity: quantity-1,size}))
                  dispatch( setCartPrice())
              }
          }
      }else if(operator === 'plus'){
          if(quantity< data.stock){
              setQuantity(quantity+1)
              console.log('set quantity', quantity+1);
              if(currentProduct){
                  dispatch(setCartProduct({...data,price:parseFloat(price.toFixed(2)),quantity: quantity+1,size}))
                  console.log('plus clicked', operator, quantity);
                  dispatch( setCartPrice())
              }
          }else{
              toast(`Sorry only ${data.stock} items in our stock !`)
          }
      }
  }

  const cartProductHandler = () =>{
      dispatch(setCartProduct({...data,price:parseFloat(price.toFixed(2)),quantity,size}))
      dispatch( setCartPrice())
      setCurrentProduct(true)
  }
  const setSizeHandler = (size:string) =>{
      setSize(size)
      if(currentProduct){
          dispatch(setCartProduct({...data,price:parseFloat(price.toFixed(2)),quantity,size}))
      }
  }

  const handleRouteOnClick = () =>{
    navigate(`/product/${data._id}`)
  }
  const buyBtnClickHandler = () =>{
    dispatch(setCartProduct({...data,price:parseFloat(price.toFixed(2)),quantity,size}))
    navigate(`/belling-address/${data._id}`)
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div className={`${category ? 'col-12 col-md-6 col-lg-4 page-wrapper' : 'col-12 col-sm-6 col-md-4 col-lg-3 page-wrapper'}`}>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header  closeButton={true}>
        </Modal.Header>
        <Modal.Body>
        <Row className="g-3">
                <div className="col-md-6">
                    <InnerImageZoom
                    src={data.img}
                    zoomSrc={data.img}
                    zoomType="hover"
                    zoomPreload={true}
                    zoomScale={1.8}
                    />
                </div>
                <div className="col-md-6">
                    <h4>{data.title}</h4>
                    <p className=''>{data.brand}</p>
                    <Rating
                    readonly
                    initialRating={data.rating}
                    fullSymbol={<FontAwesomeIcon className='text-warning' icon={faStar}/>}
                    emptySymbol={<FontAwesomeIcon className='empty-star-icon' icon={regStar}/>}
                    />
                    <h5 className='single-page-price'><span>${price.toFixed(2)}</span> <span className="original-price" style={{ display:`${data.price<12 && 'none'}`, textDecoration:'line-through'}}>${data.price}</span> <span className="saved-price" style={{display:`${data.price<12 && 'none'}`}}>Save: ${(data.price - price).toFixed(2)}</span></h5>
                    <p style={{fontSize:'13px'}}><span className="fw-bold">Free Shipping, Returns & Exchanges </span><br />On all orders over $75</p>
                    <p style={{fontSize:'13px'}} className="my-0"><span className="fw-bold">Material:</span> 90/10 Cotton/Spandex</p>
                    <p style={{fontSize:'13px'}} className="mt-0"><span className="fw-bold">Care:</span> Machine Wash/Line Dry</p>
                    <h5 className='text-success'>Only {data.stock} left !</h5>
                    <div>
                        Available size
                        <div className='available-size-container'>
                            <div className={`${size === "S" && 'active'}`} onClick={ ()=> setSizeHandler('S')}>S</div>
                            <div className={`${size === "M" && 'active'}`} onClick={ ()=> setSizeHandler('M')}>M</div>
                            <div className={`${size === "L" && 'active'}`} onClick={ ()=> setSizeHandler('L')}>L</div>
                            <div className={`${size === "XL" && 'active'}`} onClick={ ()=> setSizeHandler('XL')}>XL</div>
                        </div>
                    </div>
                    <div className="quantity-input-box my-3">
                        <button onClick={ ()=> setInputValue('minus')}>-</button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={ ()=> setInputValue('plus')}>+</button>
                    </div>
                    { currentProduct && <p className='text-success mb-0'><FontAwesomeIcon icon={faCheckCircle}/> This item already in your cart</p>}
                    <Row>
                        <div className="col-12">
                            <button onClick={ cartProductHandler } className='btn btn-outline-danger w-100 my-2'><FontAwesomeIcon icon={faCartPlus}/> Add to Cart</button>
                        </div>
                        <div className="col-12">
                            <button onClick={ buyBtnClickHandler } className='btn btn-danger w-100 my-2'>Buy it now</button>
                        </div>
                    </Row>
                </div>
            </Row>
        </Modal.Body>
      </Modal>

  <div className="page-inner">
    <div className="row">
      <div className="el-wrapper">
      <div style={{opacity:`${ data.price> 12 ? '1':'0'}`}} className="save-div">
        <p>save</p>
        <p>${(data.price - discountPrice).toFixed(2)}</p>
      </div>
        <div onClick={ handleRouteOnClick } className="box-up">
          <img className="img mb-2" src={data.img} alt=""/>
          <div className="img-info">
            <div className="info-inner">
              <span className="p-name">{data.title}</span>
              <span className="p-company">{data.brand}</span>
            </div>
            <div className="a-size">
                Available sizes: <span className="size">S , M , L , XL</span>
            </div>
          </div>
        </div>

        <div className="box-down">
          <div className="h-bg">
            <div className="h-bg-inner"></div>
          </div>

          <div className="cart">
            <div className="price">
              <span className="me-3">{ data.price> 12 && `$${(discountPrice).toFixed(2)}`}</span>
              <span style={{textDecoration:`${data.price> 12 && 'line-through'}`}} >${data.price}</span>
            </div>
            <span className="add-to-cart">
              <span className="txt">
                  <div onClick={handleShow} className="col-6 cart-button" title="Quick shop">Quick Shop</div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default ProductCard;
