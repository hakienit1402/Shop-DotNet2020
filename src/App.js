import React, { useState,useEffect } from "react";
import "./App.css";
import { Skeleton } from 'antd';
import Nav from "./components/Header/Nav";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NotFound from "./pages/404/NotFound";
import {About} from "./pages/About/About";
import LoginPage from "./pages/Login-Register/LoginPage";
import RegisterPage from "./pages/Login-Register/RegisterPage";
import ScrollToTop from "./ScrollToTop";
import ProductDetailPage from "./pages/ProductPage/ProductDetailPage";
import { BackTop } from "antd";
import CheckMail from "./pages/Login-Register/CheckMail";
import { ChangePass } from "./pages/CustomerPage/ChangePass";
import { ForgetPass } from './pages/Login-Register/ForgetPass';
// import context from './context';
function App() {
  const [count, setCount] = useState(JSON.parse(localStorage.getItem("COUNT")) ? JSON.parse(localStorage.getItem("COUNT")) : 0);
  // const callBackCount = (data) => {
  //   setCount(data)
  // }
  const [search,setSearch] = useState('')

  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("COUNT"));
    setCount(value)
  },[]);

  const onSearch = (value) => {
    setSearch(value)

  }
  // console.log(search)
  // useEffect(() => {
  //  localStorage.setItem("SEARCH", JSON.stringify(search)) 
  // },[search])
  return (
    <Router>

      <ScrollToTop />  
      {/* <context.Provider value={count}> */}
      <Nav 
      count={count}
      onSearch={onSearch}

      />
     
      <main className="main">

        <Switch>
          <Route path="/" exact={true}>
            <HomePage search={search} />
          </Route>
          <Route path="/product">
            <ProductPage search={search}/>
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
          <Route path="/aboutus" component={About} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/checkmail" component={CheckMail} />
          <Route path="/forgetpass" component={ForgetPass} />
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
