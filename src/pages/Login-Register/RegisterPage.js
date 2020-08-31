import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {
  FacebookFilled,
  GooglePlusSquareFilled,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { DatePicker,Radio,Button } from 'antd';
import axios from 'axios';
const RegisterPage = () => {
  const [formValue,setFormValue] = useState(
    {fullname:'',
    username:'',
    password:'',
    });
  // const [formValue,setFormValue] = useState([])
  const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [dateofbirtd,setDateofbirtd] = useState('');
  // const [gender, setGender] = useState('')
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      
        [e.target.name] : e.target.value,
        // dateofbirtd : dateofbirtd,
        // gender: gender

      
    })
    

  }
  
// const onChange = (value,dateString)=>{
//   // console.log( dateString);
//   console.log( typeof(dateString));
//   setDateofbirtd(dateString)
  
// }

// const onGenderChange=(e)=>{
//   console.log(typeof(e.target.value));
//   setGender(e.target.value)

// }
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formValue)
  axios.post('http://localhost:44315/api/taikhoans/register', formValue)
  .then((res) => {
    alert("đăng kí thành công")
    // console.log(res.data);
    // this.props.history.push("/");
    // window.location.reload();
  })
  .catch(() => alert("Tài khoản đã tồn tại"));


}

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
              <form className="formlogin" onSubmit={handleSubmit}>
                <div className="input-group form-group">
                  <span className="form-icon">
                    
                    <UserOutlined />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="full name"
                    name="fullname"
                    required
                    
                    // lag vcl
                    onChange={handleChange}
                    value={formValue.fullname}
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
                    value={formValue.username}
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
                    required
                    onChange={handleChange}
                    value={formValue.password}
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
                {/* <div className="date-gender">
                <DatePicker onChange={onChange} style={{width:170,height:40}} format={dateFormat} />
                <Radio.Group style={{marginTop:5}} onChange={onGenderChange}>
                <Radio value="Male"><a style={{color:'white'}}>Male</a></Radio>
                <Radio value="Female"><a style={{color:'white'}}>Female</a></Radio>
                </Radio.Group>
                </div> */}
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
