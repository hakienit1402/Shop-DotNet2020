import React, {useEffect,useState} from 'react'

import ProductItem from './ProductItem';
 const ProductContainer = ({products}) => {
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("CART")) ? JSON.parse(localStorage.getItem("CART")) : []);
  const onAddToCart = (productItem) => {
    let dataIndex = cart?.findIndex((x) => x.id === productItem.id);
    if (dataIndex !== -1) {
      alert('Sản phẩm đã có trong giỏ hàng')
    } else {
      Object.assign(productItem, { quanlity: 1 });
      setCart([...cart, productItem]);
      window.location.reload()
    }
  };
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);
  // render
  return (
    <div className="main-product">
           <div className="row">
               {/* content */}
           {products.map(product => 
           <div key= {product.id}>
             <ProductItem
               product={product} 
               onAddToCart={onAddToCart}
             />
             </div>
             )}
           </div>
         </div>
  )
}
export default ProductContainer;