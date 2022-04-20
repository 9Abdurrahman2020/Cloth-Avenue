import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row } from 'react-bootstrap';
import './productCard.css';

const  ProductCard = () => {
    return (
        <div className="container page-wrapper">
  <div className="page-inner">
    <div className="row">
      <div className="el-wrapper">
        <div className="box-up">
          <img className="img" src="https://cdn.shopify.com/s/files/1/2617/9878/products/avenue-shopify-theme-womens-tops-9_600x.jpg?v=1534170910" alt=""/>
          <div className="img-info">
            <div className="info-inner">
              <span className="p-name">I feel like Pablo</span>
              <span className="p-company">Yeezy</span>
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
            <span className="price">$120</span>
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
