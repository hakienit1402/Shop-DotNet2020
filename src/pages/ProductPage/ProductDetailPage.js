import React, { useState, useEffect} from "react";
import { Breadcrumb, Row,Tabs,Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductSlide from "./ProductSlide";
import Review from "../../components/Product/Review";


const { TabPane } = Tabs;
const ProductDetailPage = (props) => {
  const [data, setData]= useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams/${props.match.params.id}`);
      setData(res.data);
      console.log(res)
      console.log(res.data);
    };
    fetchData();
  }, []);
  // state = {
  //   product: [],
  // };
  // componentDidMount() {
  //   axios
  //     .get(`https://localhost:44315/api/sanphams/${this.props.match.params.id}`)
  //     .then((res) => {
  //       const products = res.data;
  //       console.log(products);
  //       this.setState({ products });
  //     });
  // }
 
    // const { name, price, image } = this.state.products;
    
    console.log(props.match.params.id);
    return (
      <div className="container product-detailpage">
        <Row className="all-breadcrump">
          <Breadcrumb className="padleft">
              
            <Breadcrumb.Item><Link to="/">HOME</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/product">MY PRODUCT</Link></Breadcrumb.Item>
            <Breadcrumb.Item>PRODUCT DETAIL</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <div className="main-details">
            <div className="row content-details">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="imageDetails">
                    <img src={data.hinhanh} alt="/" />  
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="infoDetails">
                        <Row>
                            <h1>{data.tensp}</h1>
                        </Row>
                        <hr/>
                       
                            <Row className="mota">
                            <h4> 
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </h4>
                            </Row>
                            <Row className="gia">
                            <h4>PRICE: {data.gia} VND</h4> 
                            </Row>
                            <p className="btn addcart">Add to cart</p>
                            
                      
                     
                    </div>
                </div>

            </div>
            <hr/>
            <div className="info-review">
                <Tabs defaultActiveKey="1" type="card" size="large" >
                    <TabPane tab="THÔNG TIN CHI TIẾT" key="1" className="tabs">
                    Content of card tab 1
                    </TabPane>
                    <TabPane tab="REVIEW" key="2" className="tabs">
                    <Review/>
                    </TabPane>
                </Tabs>
            </div>
            <hr/>
            {/* <Divider
          style={{
            color: "red",
            fontSize: 22,
            fontWeight: "bold",
            padding: 20,
            background: "lightgray",
          }}
            >
          ROLATED PRODUCTS
        </Divider>
            <ProductSlide/> */}
        </div>
      </div>
    );
  }

export default ProductDetailPage;
