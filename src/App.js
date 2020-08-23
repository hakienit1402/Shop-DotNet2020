import React, { useState,useContext,useEffect } from "react";
import "./App.css";
import Nav from "./components/Header/Nav";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import LoginPage from "./pages/Login-Register/LoginPage";
import RegisterPage from "./pages/Login-Register/RegisterPage";
import ScrollToTop from "./ScrollToTop";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage";
import { BackTop } from "antd";
import context from './context';
function App() {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("COUNT")) ? JSON.parse(localStorage.getItem("COUNT")) : 0);
  // const callBackCount = (data) => {
  //   setCount(data)
  // }
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("COUNT"));
    console.log(value)
    setCount(value)
  },[]);
  return (
    <Router>
      <ScrollToTop />  
      {/* <context.Provider value={count}> */}
      <Nav 
      count={count}
      />
     
      <main className="main">
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/product">
            <ProductPage />
          </Route>
          <Route path="/productdetail/:id" component={ProductDetailPage} />
          {/* <Route path="/cart" component={CartPage} /> */}
          <Route
            path="/cart"
            component={() => <CartPage 
              // callBackCount={callBackCount}
             />}
          />
          <Route path="/account" component={CustomerPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/aboutus" component={NotFound} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="" component={NotFound} />
        </Switch>
      </main>
      <BackTop />
      <Footer />
      {/* </context.Provider>  */}
    </Router>
  
  );
}

export default App;
