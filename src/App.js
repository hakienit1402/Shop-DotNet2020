import React, { useState,useCallback } from "react";
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
function App() {
  const [count, setCount] = useState()
  const callBackCount =  (data) => {
    setCount(data)
  }
  // const callBackCount = useCallback((data) => {
  //   setCount(data)
  // }, [])
  return (
    <Router>
      <ScrollToTop />
      <Nav count={count}/>
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
            component={() => <CartPage parentCallback={callBackCount} />}
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
    </Router>
    // </MyContext.Provider>
  );
}

export default App;
