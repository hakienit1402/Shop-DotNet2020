import React, { useState,useEffect } from "react";
import {Link, Redirect} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  FacebookFilled,
  GooglePlusSquareFilled,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { DatePicker,Radio,Button } from 'antd';
import axios from 'axios';
import { data } from "jquery";
import { set } from "lodash";
const RegisterPage = () => {
  const history = useHistory();
  const [formValue,setFormValue] = useState([])
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
        [e.target.name] : e.target.value,
    })
  }
  useEffect(() => {
   setFormValue({
     ...formValue,
     roles:'0',
     status:'1'
   })
  }, [])
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formValue)
  axios.post('https://localhost:44315/api/taikhoans/register', formValue)
  .then((res) => {
    console.log(res.data)
    if (res.data == false) {
      alert('Username tồn tại')
    }
    else {
      alert('đăng kí thành công')
    history.push("/login")
    } 
  })
}
    return (
      <div className="container loginpage">
         <div className="d-flex justify-content-center h-100">
          <div className="card-register">
            <div className="card-header">
              <h3 style={{ paddingTop: 20 }}>Sign Up</h3>
              <div className="d-flex justify-content-end  social_icon">
                <span>
                  <FacebookFilled />
                </span>
                <span>
                  <GooglePlusSquareFilled />
                </span>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <form className="formlogin" onSubmit={handleSubmit}>
                <div className="input-group form-group">
                  <span className="form-icon">
                    
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="full name"
                    name="hoten"
                    required
                    
                  
                    onChange={handleChange}
                    // value={formValue.fullname}
                  />
                </div>
               
                <div className="input-group form-group">
                  <span className="form-icon">
                    
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    name="username"
                    required
                    onChange={handleChange}
                    // value={formValue.username}
                  />
                </div>
               
                <div className="input-group form-group">
                  <span className="form-icon">
                    <KeyOutlined />
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="pass"
                    required
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="input-group form-group">
                  <span className="form-icon">
                    <KeyOutlined />
                  </span>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm password"
                    name="passwordConfirm"
                    required
                    
                    onChange={e => setPasswordConfirm(e.target.value)}
                    value={passwordConfirm}
                  />
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn float-right login_btn"
                  >
                    REGISTER
                  </Button>
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="signup links">
                Are you have an account?<Link to="/login">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
   
      </div>
    );
  }


export default RegisterPage;
