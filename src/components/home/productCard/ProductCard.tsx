import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
import { IProduct } from '../../../features/Types';
import './productCard.css';

const  ProductCard = ({data, category}:{data:IProduct, category?:string}) => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const discountPrice:number = (data.price * .85);
  
  const handleRouteOnClick = () =>{
    navigate(`/product/${data._id}`)
  }
    return (
        <div className={`${category ? 'col-12 col-md-6 col-lg-4 page-wrapper' : 'col-12 col-sm-6 col-md-4 col-lg-3 page-wrapper'}`}>
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
                  <div className="col-6 cart-button" title="Quick shop">Quick Shop</div>
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
