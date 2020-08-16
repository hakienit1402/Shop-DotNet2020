// import React, { Component } from "react";
// import axios from "axios";
// import { Button } from "antd";
// import { Link } from "react-router-dom";
// import ProductItem from "./ProductItem";
// const ProductContainerLimit = () => {
//   const [products,setProducts] = useState([])

//   componentDidMount() {
//     axios.get(`http://localhost:3000/products?_page=1&_limit=11`).then((res) => {
//       const products = res.data;
//       this.setState({ products });
//     });
//   }
//   useEffect() {
    
//   }

//   render() {
//     const { onAddToCart } = this.props;
//     return (
//       <div className="main-product">
//         <div className="row">
//           {/* content */}
//           {this.state.products.map((product) => (
//             <ProductItem product={product} key={product.id} onAddToCart={onAddToCart} />
//           ))}

//           <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 btn-view-more">
//             <Link to="/product">
//               <Button type="primary" className="view-more">Xem thêm</Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ProductContainerLimit;
