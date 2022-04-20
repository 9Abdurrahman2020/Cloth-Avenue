import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-bootstrap';
import { IProduct } from '../../../features/Types';
import './productCard.css';

const  ProductCard = ({data}:{data:IProduct}) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 page-wrapper">
  <div className="page-inner">
    <div className="row">
      <div className="el-wrapper">
        <div className="box-up">
          <img className="img" src={data.img} alt=""/>
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
            <span className="price">${data.price}</span>
            <span className="add-to-cart">
              <span className="txt">
                  <Row style={{justifyContent:"space-between"}}>
                      <div className="col-6" title="Quick shop">shop</div>
                      <div className="col-6"><FontAwesomeIcon title='Add to Cart' icon={faCartPlus}/></div>
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
