import React, { useState, useEffect } from "react";
import Slide from "./Slide";
import { Divider, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductContainer from "../ProductPage/ProductContainer";
//import ProductList from "../ProductPage/ProductList";
import ProductContainerLimit from "./../ProductPage/ProductContainerLimit";

const HomePage = ({ search }) => {
  const [products, setProducts] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams`);
      setProducts(res.data);
      // console.log(res);
      // console.log(res.data);
    };
    fetchData();
  }, []);
  const filterData = products.filter((filters) => {
    return filters.tensp.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="container homepage">
      {search !== "" ? (
        <>
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
          <ProductContainer search={search} products={filterData} />
        </>
      ) : (
        <>
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

          <ProductContainer search={search} products={filterData} />

          <Link to="/product">
            <Button type="primary" className="view-more">
              Xem thêm
            </Button>
          </Link>
        </>
      )}

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
};

export default HomePage;
