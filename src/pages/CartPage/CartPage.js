import React, { useState, useEffect,useMemo, useCallback } from "react";
import { Icon, Row, Divider, InputNumber, Button } from "antd";
import ProductSlide from "../ProductPage/ProductSlide";
import { DeleteOutlined } from "@ant-design/icons";
import { Toast } from "react-bootstrap";
const CartPage = (props) => {
  // const { parentCallback } = props;
  const [dataInitial, setDataInitial] = useState([]);
  const sum = JSON.parse(localStorage.getItem("SUM"));
  const [dataAfterUpdate, setDataAfterUpdate] = useState(dataInitial ? dataInitial : []);
  const [total, setTotal] = useState(sum ? sum : 0);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const onChangeQuanlity = (val, id) => {
    let dataAfterUpdate = [];
    let total = 0;
    dataInitial.map((x) => {
      if (x.id === id) {
        x.quanlity = val;
      }
      dataAfterUpdate.push(x);
      total += x.quanlity * x.price;   
      setTotal(total);
      localStorage.setItem("CART", JSON.stringify(dataAfterUpdate));
    });
    localStorage.setItem("SUM", JSON.stringify(total));
  };
  //effect total
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("CART"))
    let total = 0 
    data && data.map((x) => {
      total += x.quanlity * x.price;
    });
    setTotal(total)
    setDataInitial(data)
    localStorage.setItem("SUM", JSON.stringify(total));
  }, [])

// effect count
  // useEffect(() => {
  //   let data = JSON.parse(localStorage.getItem("CART"))
  //   let count = 0;
  //   data.map((x) => {
  //     count += x.quanlity;
  //     setCount(count);
  //   });
  //   // parentCallback(count)
  //   localStorage.setItem("COUNT", JSON.stringify(count));
  // }, [count])


  return (
    <div className="container cartpage">
      <Row className="cart-main">
        <div className="col-lg-8">
          <div className="main-heading">Shopping Cart</div>
          <div className="table-cart">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {dataInitial && dataInitial.map((item, idx) => 
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{formatNumber(item.price)}</td>
                      <td>
                        <InputNumber
                          min="1"
                          defaultValue={item.quanlity}
                          onChange={(val) => onChangeQuanlity(val, item.id)}
                        />
                      </td>
                      <td>{formatNumber(item.quanlity * item.price)}</td>
                    </tr>
                )}
              </tbody>
            </table>
            <p>{total}</p>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cart-totals">
            <h3>Cart Totals</h3>
            <form action="#" method="get" acceptCharset="utf-8">
              <table>
                <tbody>
                  <tr>
                    <td>Subtotal</td>
                    <td className="subtotal">{formatNumber(total)} VND</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td className="free-shipping">Free Shipping</td>
                  </tr>
                  <tr className="total-row">
                    <td>Total</td>
                    <td className="price-total">{formatNumber(total)} VND</td>
                  </tr>
                </tbody>
              </table>
              <div className="btn-cart-totals">
                <a href="#" className="update round-black-btn">
                  Continue to Shipping
                </a>
                <a href="#" className="checkout round-black-btn">
                  Proceed to Checkout
                </a>
              </div>
            </form>
          </div>
        </div>
      </Row>
      <hr />
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
      </Divider> */}
    </div>
  );
};

export default CartPage;
