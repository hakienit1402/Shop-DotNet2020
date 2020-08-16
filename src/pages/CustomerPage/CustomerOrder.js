import React, { Component } from 'react';
import {  Descriptions,Divider } from 'antd';


class CustomerOrder extends Component {
   
    render() {
      
        return (
            <div className="process-content">
            <Descriptions title="Lịch sử mua hàng"/>
            <Divider/>
            

            </div>
        );
    }
}

export default CustomerOrder;