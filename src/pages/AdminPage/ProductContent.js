import React, { Component } from "react";
import axios from "axios";
import SweetAlert from 'sweetalert-react';
import './../../../node_modules/sweetalert/dist/sweetalert.css';
import { Modal,Upload,Button,Pagination,Input  } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const { Search } = Input;
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ProductContent extends Component {
  state = {
    data: [],
    visible: false,
    confirmLoading: false,
    id:'',
    name:'',
    price:'',
    fileList: [
      {
        uid: '1',
        name: 'image.png',
        status: 'done',
        url: ''
      }
    ],
  };
  componentDidMount() {
    axios.get(`http://localhost:3000/products`).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  }
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false,
    });
  };
  showModalUpdate = (item) => {
    this.setState({
      visible: true, 
      id:item.id,
      name:item.name, 
      price:item.price,
      
      fileList:[{
        uid: item.id,
        name: item.name,
        status: 'done',
        url: item.image
      }]
    });
  };
  
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  // image
  handleChange = ({ fileList }) => this.setState({ fileList });

  // delete product
  onDeleteProduct = (item) => {
    console.log(item.id)
    
    const {idAlert,data} = this.state;
 
      for(let i = 0; i < data.length; i++) {
          if(data[i].id === idAlert) {
           
            data.splice(i, 1);
          
              break;
          }     
      }
      this.setState({showAlert: false});
  }
  
 
  render() {
    
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { visible,confirmLoading,fileList} = this.state;
    return (
      <div>
        <div style={{float: 'right',marginBottom:5,display:'flex'}}>
        <div 
        style={{marginRight:20}}
        >
        <Search
            placeholder="Search sản phẩm..."
            onSearch={(value) => console.log(value)}
            style={{ width: 300}}
          />
         </div>
        <Pagination total={50} />
      

        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Images</th>
              <th>Price</th>
              <th>Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td><img src={item.image} alt={item.name}  style={{height: 100, width:80}}/></td>
                <td>{item.price}</td>
                <td>
                  <Button
                    type="button"
                    className="btn btn-default"
                    onClick={() => this.showModalUpdate(item)}
                  >
                    Sửa
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-default"
                    // onClick={() => this.onDeleteProduct(item)}
                    onClick={()=>this.setState({ showAlert: true,idAlert: item.id,nameAlert:item.name})}
                  >
                    Xóa
                  </Button>
                  <SweetAlert
                    show={this.state.showAlert}
                    title="Bạn có muốn xóa sản phẩm"
                    text= {this.state.nameAlert}
                    showCancelButton
                    onOutsideClick={()  => this.setState({ showAlert: false })}
                    onEscapeKey={()     => this.setState({ showAlert: false })}
                    onCancel={()        => this.setState({ showAlert: false })}
                    onConfirm={() => this.onDeleteProduct(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       {/* modal sửa sản phẩm */}
        <Modal
          title="Sửa sản phẩm"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <form action="" method="POST" role="form">
            <div className="form-group">

              <label for="">Name</label>
              <input type="text" className="form-control" value={this.state.name} placeholder="Input field"/>
              <label for="">Image</label>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={this.handleChange}
                >
               {fileList.length >= 8 ? null : uploadButton}
               </Upload> 
              <label for="">Price</label>
              <input type="text" className="form-control" value={this.state.price}  placeholder="Input field"/>
              <label for="">Types</label>
              <input type="text" className="form-control"  placeholder="Input field"/>

            </div>
          </form>
        </Modal>        
        
      </div>
    );
  }
}

export default ProductContent;
