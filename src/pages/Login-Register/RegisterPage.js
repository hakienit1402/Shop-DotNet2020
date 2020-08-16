import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {
  FacebookFilled,
  GooglePlusSquareFilled,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { DatePicker,Radio,Button } from 'antd';
class RegisterPage extends Component {

onChange = (value,dateString)=>{
  console.log( dateString);
}

onGenderChange=(e)=>{
  console.log(e.target.value);
}
  render() {
    const dateFormat = 'DD-MM-YYYY';
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
              <form className="formlogin" onSubmit={this.handleSubmit}>
                <div className="input-group form-group">
                  <span className="form-icon">
                    
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="full name"
                    name="username"
                    required
                    ref="username"
                    // lag vcl
                    // onChange={this.handleChange}
                    // value={username}
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
                    ref="username"
                    // lag vcl
                    // onChange={this.handleChange}
                    // value={username}
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
                    name="password"
                    ref="password"
                    required
                    // onChange={this.handleChange}
                    // value={password}
                  />
                </div>
                <div className="date-gender">
                <DatePicker onChange={this.onChange} style={{width:170,height:40}} format={dateFormat} />
                <Radio.Group style={{marginTop:5}} onChange={this.onGenderChange}>
                <Radio value="Male"><a style={{color:'white'}}>Male</a></Radio>
                <Radio value="Female"><a style={{color:'white'}}>Female</a></Radio>
                </Radio.Group>
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    defaultValue="Login"
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
}

export default RegisterPage;
