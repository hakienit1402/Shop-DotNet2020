import React, { useState, useEffect} from "react";
import Slide from "./Slide";
import { Divider,Button } from "antd";
import {Link} from "react-router-dom";
import axios from "axios";
import ProductContainer from "../ProductPage/ProductContainer";
//import ProductList from "../ProductPage/ProductList";
import ProductContainerLimit from './../ProductPage/ProductContainerLimit';

const HomePage = () =>{
 
  const [products,setProducts] = useState([])
  // const [cart,setCart] = useState(JSON.parse(localStorage.getItem("CART")) ? JSON.parse(localStorage.getItem("CART")) : []);
  // const onAddToCart = (productItem) => {
  //   setCart([...cart,productItem])
  // };
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/products?_page=1&_limit=12`).then((res) => {
  //     setProducts(res.data);
  //   }); 
  //   localStorage.setItem("CART", JSON.stringify(cart));
  // }, [cart]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:61017/api/sanphams`);
      setProducts(res.data);
      console.log(res)
      console.log(res.data);
    };
    fetchData();
  }, []);
    return (
        <div className="container homepage">
          <Slide />
          <hr />
          <Divider
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
              padding: 20,
              background: "lightgray",
            }}
          >
            TOP PRODUCT
          </Divider>
          {/* <ProductList/> */}
           <ProductContainer 
           products={products}
            // onAddToCart={onAddToCart}
            /> 
          
             <Link to="/product">
               <Button type="primary" className="view-more">Xem thêm</Button>
             </Link>
           
          <Divider
            style={{
              color: "red",
              fontSize: 22,
              fontWeight: "bold",
              padding: 20,
              background: "lightgray",
            }}
          >
            THƯƠNG HIỆU
          </Divider>
        </div>
     
    );
  }

export default HomePage;
