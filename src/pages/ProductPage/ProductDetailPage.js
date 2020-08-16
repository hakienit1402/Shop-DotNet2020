import React, { Component } from "react";
import { Breadcrumb, Row,Tabs,Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductSlide from "./ProductSlide";
import Review from "../../components/Product/Review";


const { TabPane } = Tabs;
class ProductDetailPage extends Component {
  state = {
    products: [],
  };
  componentDidMount() {
    axios
      .get(`http://localhost:3000/products/${this.props.match.params.id}`)
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      });
  }
  render() {
    const { name, price, image } = this.state.products;
    console.log(image);
    console.log(this.props.match.params.id);
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
                    <img src={image} alt={name} />  
                    </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="infoDetails">
                        <Row>
                            <h1>{name}</h1>
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
                            <h4>PRICE: {price} VND</h4> 
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
            <Divider
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
            <ProductSlide/>
        </div>
      </div>
    );
  }
}
export default ProductDetailPage;
