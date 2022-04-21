import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-bootstrap';
import { useAppDispatch } from '../../../app/hooks';
import { setCartProduct } from '../../../features/counter/storeSlice';
import { IProduct } from '../../../features/Types';
import './productCard.css';

const  ProductCard = ({data}:{data:IProduct}) => {
  const dispatch = useAppDispatch();
  const number:number = Math.round(Math.random()*1);
  const discountPrice:number = (data.price * .85);
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 page-wrapper">
  <div className="page-inner">
    <div className="row">
      <div className="el-wrapper">
      { <div style={{opacity:`${number < 1 && '0'}`}} className="save-div">
        <p>save</p>
        <p>${(data.price - discountPrice).toFixed(2)}</p>
      </div> }
        <div className="box-up">
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
              <span className="me-3">{ number > 0 && `$${(discountPrice).toFixed(2)}`}</span>
              <span style={{textDecoration:`${number > 0 && 'line-through'}`}} >${data.price}</span>
            </div>
            <span className="add-to-cart">
              <span className="txt">
                  <Row style={{justifyContent:"space-between"}}>
                      <div className="col-6 cart-button" title="Quick shop">shop</div>
                      <div className="col-6 cart-button"><FontAwesomeIcon onClick={ ()=>dispatch(setCartProduct(data)) } title='Add to Cart' icon={faCartPlus}/></div>
                  </Row>
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
