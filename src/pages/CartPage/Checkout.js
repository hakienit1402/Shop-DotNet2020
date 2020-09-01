import React, { useEffect, useState } from "react";
import { Modal, Steps, Button, message, Col } from "antd";
import axios from 'axios'
import { FormLogin } from './FormLogin';
import { FormInfo } from "./FormInfo";
import context from './../../context';
import { Confirm } from './Confirm';
const { Step } = Steps;

export const Checkout = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState();
  const [stepCur, setStepCur] = useState(0);
  const [data] = useState(JSON.parse(localStorage.getItem('HOADON')) ? JSON.parse(localStorage.getItem('HOADON')): [])
  console.log(data)
  const showModal = () => {
    setVisible(true);
    const isLogin = JSON.parse(localStorage.getItem('isLogin'));
    if (isLogin) setStepCur(1)
  
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const onBack = () => {
    setStepCur(stepCur - 1);
  };
  const onNext = () => {
    setStepCur(stepCur + 1);

  };
  const steps = [
    {
      title: "LOGIN",
      content: <FormLogin/>
    },
    {
      title: "Thông tin",
      content: <FormInfo/>
    },
    {
      title: "Xác nhận thanh toán",
      content: <Confirm/>
    },
  ];
  const onCheckout = () => {
    setVisible(false);
    const key ='add';
    message.loading({ content: 'Xác nhận thanh toán',key , style: {
     marginTop: '14vh', fontSize:"20px"
   },});
    setTimeout(() => {
        axios.post(`https://localhost:44315/api/hoadons`,data).then(res => { 
            console.log(res.data)
            message.success({ content: 'Thanh toán thành công !', key, duration: 2, style: {
                marginTop: '15vh', fontSize:"20px"
              }, });
          }).catch (message.success({ content: 'Thanh toán thất bại !', key, duration: 2, style: {
            marginTop: '15vh', fontSize:"20px"
          }, }))
       }, 1000);
    
    // let data = JSON.parse(localStorage.getItem("CART"));
    // console.log(data);
  };
  return (
    <div>
      <a type="primary" className="update round-black-btn" onClick={showModal}>
        Proceed to Checkout
      </a>
      <Modal
        className="checl-out"
        title="Xác nhận thanh toán"
        visible={visible}
        onCancel={handleCancel}
        footer={false}
      >
        <Steps current={stepCur}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <hr />
        {/* start content */}
        <div className="steps-content">
            {steps[stepCur].content}
        </div>     
        <hr />
        <div
          className="steps-action"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {stepCur < steps.length - 1 && (
            <Button type="primary" onClick={() => onNext()}>
              Next
            </Button>
          )}
          {stepCur === steps.length - 1 && (
            <Button type="primary" onClick={() => onCheckout()}>
              Done
            </Button>
          )}
          {stepCur > 0 && (
            <Button style={{ margin: "0 10px" }} onClick={() => onBack()}>
              Previous
            </Button>
          )}
        </div>{" "}
      </Modal>
    </div>
  );
};
