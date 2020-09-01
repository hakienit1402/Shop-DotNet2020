import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message,
  Upload,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
const { Option } = Select;
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export const Addproduct = () => {
  const [thuonghieu, setThuonghieu] = useState([]);
  const [data,setData] = useState([])
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/thuonghieux`);
      setThuonghieu(res.data);
    };
    fetchData();
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    const key ='add';
    message.loading({ content: 'Thêm mới sản phẩm......',key , style: {
     marginTop: '14vh', fontSize:"20px"
   },});
    setTimeout(() => {
        axios.post(`https://localhost:44315/api/sanphams`,data).then(res => { 
            console.log(res.data)
            message.success({ content: 'Thêm thành công !', key, duration: 2, style: {
                marginTop: '15vh', fontSize:"20px"
              }, });
          }).catch (message.success({ content: 'Thêm thất bại !', key, duration: 2, style: {
            marginTop: '15vh', fontSize:"20px"
          }, }))
       }, 1000);
    
  };

  const onFinish = (values) => {
    Object.assign(values, {hinhanh : imageUrl});
    const key ='add';
       message.loading({ content: 'Kiểm tra thông tin sản phẩm......',key , style: {
        marginTop: '14vh', fontSize:"15px",marginLeft:700
      },});
    setTimeout(() => {
    setData(values)
      message.success({ content: 'Kiểm tra thành công !', key, duration: 2, style: {
        marginTop: '14vh', fontSize:"15px",marginLeft:700
      }, });
    }, 500);
  };
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,

        (imageUrl) => setImageUrl(imageUrl),

        setLoading(false)
      );
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        <PlusOutlined /> New product
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
            <Button onClick={onClose}>Save</Button>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="tensp"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Tên sản phẩm không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="idth"
                label="Owner"
                rules={[{ required: true, message: "Chọn thương hiệu" }]}
              >
                <Select placeholder="Thương hiệu">
                  {thuonghieu.map((th) => (
                    <Option value={th.idth} key={th.idth}>
                      {th.tenth}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
           
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item
                name="gia"
                label="Giá"
                rules={[
                  {
                    required: true,
                    message: "Giá sản phẩm không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Giá" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span style={{ fontWeight: "bolder" }}>Hình ảnh</span>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            
            <Col span={12}>
              <Form.Item
                name="sl"
                label="Số lượng"
                rules={[{ required: true, message: "Điền số lượng" }]}
              >
                <Input placeholder="Số lượng"/>
              </Form.Item>
            </Col>
          </Row>
         
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
