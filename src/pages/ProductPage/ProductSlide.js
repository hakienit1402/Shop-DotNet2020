// import React, { Component } from 'react';
// import Slider from "react-slick";
// import axios from 'axios';
// import {Link} from 'react-router-dom';
// class ProductSlide extends Component {
//     state = {
//         products: [],
//       }
//       componentDidMount() {
//         axios.get(`http://localhost:3000/products?_page=1&_limit=7`)
//         .then(res => {
//           const products = res.data;
//           this.setState({ products });
//         })
//       }
//     render() {
//         var settings = {
//             dots: true,
//             infinite: true,
//             slidesToShow: 6, 
//             slidesToScroll: 1, 
//             autoplay: true, 
//             autoplaySpeed: 4000
//           };
//         return (
//             <div className="container myslideproducts row">
//             <Slider {...settings}>
            
//             { this.state.products.map(product => 
//             <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" key={product.id}>
//               <Link to={"/productdetail/"+ product.id} >
//             <div className="product-item">
//             <div className="pi-img-wrapper">         
//               <img src={product.image} className="img-responsive" alt="#" />   
//             <div>         
//             </div>
//             </div>
            
//             <h3 style={{marginTop:10}}><p>{product.name}</p></h3>
           
//             <div className="pi-price">{product.price}</div>
//             <p className="btn add2cart">Add to cart</p>
            
//           </div>
//           </Link>
//           </div>
//             )}
//             </Slider>
//             </div>
           
//         );
//     }
// }

// export default ProductSlide;