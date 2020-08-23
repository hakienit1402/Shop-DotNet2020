import React, {useEffect,useState} from 'react'
import context from './../../context';
import ProductItem from './ProductItem';
 const ProductContainer = ({products}) => {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("COUNT")) ? JSON.parse(localStorage.getItem("COUNT")) : 0);
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem("CART")) ? JSON.parse(localStorage.getItem("CART")) : []);
  const onAddToCart = (productItem) => {
    let dataIndex = cart?.findIndex((x) => x.id === productItem.id);
    if (dataIndex !== -1) {
      alert('Sản phẩm đã có trong giỏ hàng')
    } else {
      Object.assign(productItem, { quanlity: 1 });
      setCart([...cart, productItem]);
      setCount(count+1);
      window.location.reload()
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
           <div key= {product.id}>
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