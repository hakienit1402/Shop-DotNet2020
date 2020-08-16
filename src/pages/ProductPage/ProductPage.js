import React, { useState, useEffect} from "react";
import { Breadcrumb, Row,Pagination } from "antd";
import { Divider,Button } from "antd";
import ProductContainer from "./ProductContainer";
import { Link } from "react-router-dom";
import axios from 'axios';
const ProductPage = () => {
  const [products,setProducts]= useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:3000/products`).then((res) => {
      setProducts(res.data);
    });    
  }, []);

    return (
      <div className="container product-page ">
        <Row className="my-breadcrump">
          <Breadcrumb className="padleft">
            <Breadcrumb.Item><Link to="/">HOME</Link></Breadcrumb.Item>
            <Breadcrumb.Item>MY PRODUCT</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Pagination  total={50} style={{ marginRight:30}}/> */}
          
        </Row>

        <ProductContainer products={products}/>
      
        {/* <Divider
          style={{
            color: "red",
            fontSize: 22,
            fontWeight: "bold",
            padding: 20,
            background: "lightgray",
          }}
        >
          HOT SALE
        </Divider> */}
        <hr />
      </div>
    );
  }
  

export default ProductPage;
