import React, { Component } from "react";
import { Descriptions, Divider, Button, Input,DatePicker,message  } from "antd";
import moment from 'moment';
class CustomerInfo extends Component {
  state = {
    isEdit: false,
  };
  onEdit = () => {
    this.setState({
      isEdit: true,
    });
  };
  onSave = () => {
    this.setState({
      isEdit: false,
    });
  };
  onUpdate = () => {
    const key = 'updatable';
    message.loading({ content: 'Cập nhật thông tin tài khoản......', key , style: {
        marginTop: '14vh', fontSize:"17px"
      },});
    setTimeout(() => {
      message.success({ content: 'Cập nhật thành công !', key, duration: 2, style: {
        marginTop: '14vh', fontSize:"17px"
      }, });
    }, 1000);
  }
  render() {
    const { isEdit } = this.state;
    const dateFormat = 'DD-MM-YYYY';
    return (
      <div>
        {!isEdit ? (
          <Descriptions title="Thông tin cá nhân" layout="vertical">
            <Descriptions.Item label="UserName">Hà Ngọc Kiên</Descriptions.Item>
            <Descriptions.Item label="Telephone">0337796445</Descriptions.Item>
            <Descriptions.Item label="Gmail">kien@gmail.com</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
            14-02-1998
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              Phường 06, Linh Trung, Thủ Đức, TP Hồ Chí Minh
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Descriptions title="Thông tin cá nhân" layout="vertical">
            <Descriptions.Item label="UserName"><Input defaultValue="Hà Ngọc Kiên"/></Descriptions.Item>
            <Descriptions.Item label="Telephone"><Input/></Descriptions.Item>
            <Descriptions.Item label="Gmail"><Input/></Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
            <DatePicker defaultValue={moment('14-02-1998', dateFormat)} format={dateFormat} />
            </Descriptions.Item>
            <Descriptions.Item label="Address">
            <Input/>
            </Descriptions.Item>
          </Descriptions>
        )}

        <Divider />
        {!isEdit ? (
          <div>
            <Button
              type="primary"
              size="large"
              style={{ marginBottom: 10, width: 200 }}
              onClick={this.onEdit}
            >
              SỬA THÔNG TIN
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ marginBottom: 10,float:"right" }}
              onClick={this.onUpdate}
            >
              CẬP NHẬT
            </Button>
            <br />
            <Button
              type="primary"
              size="large"
              style={{ marginBottom: 10, width: 200 }}
            >
              THAY ĐỔI PASSWORD
            </Button>
          </div>
        ) : (
          <Button
            type="primary"
            size="large"
            style={{ marginBottom: 10, width: 200 }}
            onClick={this.onSave}
          >
            LƯU THAY ĐỔI
          </Button>
        )}
      </div>
    );
  }
}

export default CustomerInfo;
