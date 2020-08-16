import React from 'react';
import { Link } from "react-router-dom";
 const ProductItem = ({product,onAddToCart}) => {
    
    return (
         <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
         <div className="product-item">
          <div className="pi-img-wrapper">
            <img src={product.image} className="img-responsive" alt="#" />

            <div></div>
          </div>
          <Link to={"/productdetail/" + product.id}>
            <h3 style={{ marginTop: 10 }}>
              <p>{product.name}</p>
            </h3>
          </Link>
          <div className="pi-price">{product.price}</div>
          <p className="btn add2cart" onClick={()=>onAddToCart(product)}>
            Add to cart
          </p>
        </div>
      </div>
    )
}
export default ProductItem;