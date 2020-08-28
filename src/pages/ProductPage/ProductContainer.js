import React, {useEffect,useState} from 'react'
import {message} from 'antd'
import context from './../../context';
import ProductItem from './ProductItem';
 const ProductContainer = ({products}) => {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("COUNT")) ? JSON.parse(localStorage.getItem("COUNT")) : 0);
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("CART")) ? JSON.parse(localStorage.getItem("CART")) : []);
  const onAddToCart = (productItem) => {
    let dataIndex = cart?.findIndex((x) => x.id === productItem.id);
    if (dataIndex !== -1) {
      // alert('Sản phẩm đã có trong giỏ hàng')
      message.warning({ content: 'Sản phẩm đã có trong giỏ hàng', style: {
        marginTop: '25vh', fontSize:"14px" , float:'right', marginRight: 10
      }, });
    } else {
     
      Object.assign(productItem, { quanlity: 1 });
      setCart([...cart, productItem]);
      setCount(count+1);
      message.success({ content: 'Thêm vào giỏ thành công !', style: {
        marginTop: '25vh', fontSize:"14px" ,
      }, });
      setTimeout(() => {
        window.location.reload()
      }, 200);
    }
  };
  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("COUNT", JSON.stringify(count));
  }, [count]);

  // render
  return (
    <context.Provider value={count}>
    <div className="main-product">
           <div className="row">
               {/* content */}
           {products.map(product => 
           <div key= {product.idsp}>
             <ProductItem
               product={product} 
               onAddToCart={onAddToCart}
             />
             </div>
             )}
           </div>
         </div>
         </context.Provider>
  )
}
export default ProductContainer;