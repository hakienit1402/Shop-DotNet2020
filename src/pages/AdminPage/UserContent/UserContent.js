import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusOutlined } from '@ant-design/icons';
import { Modal,Upload  } from "antd";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
const UserContent = () => {
  const [data, setData] = useState([]);
  const [fileList, setfileList] = useState([
    {
      uid: '0',
      name: 'image.png',
      status: 'done',
      url: ''
    }
  ]);
  const [dataUpdate, setdataUpdate] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState([1]);
  const [dataPerPage] = useState([5]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:61017/api/sanphams`);
      setData(res.data);
    };
    fetchData();
  }, []);
  // current Data
  const end = currentPage * dataPerPage;
  const begin = end - dataPerPage;
  const currentData = data.slice(begin, end);
  //change page number
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  //edit product
  const onEdit = (dataEdit) => {
    setVisible(true);
    setdataUpdate(dataEdit);
    setfileList([{
      uid: dataEdit.idsp,
      name: dataEdit.tensp,
      status: 'done',
      url: dataEdit.hinhanh
    }]);
  
  }
  //delete product
  const onDelete = (dataEdit) => {
    
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
const handleChange = ({fileList}) => setfileList(fileList);

const handleOk = () => {
    setconfirmLoading(true);
    setTimeout(() => {
      setconfirmLoading(false);
      setVisible(false);
      setdataUpdate([]);
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  }
  // render
  return (
    <div>
      <DataTable data={currentData} onEdit={onEdit} onDelete={onDelete}/>
      <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
      {/* Modal edit */}
      <Modal
          title="Sửa sản phẩm"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <form action="" method="POST" role="form">
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" onChange={(e) => setdataUpdate([{tensp : e.target.value}])  } value={dataUpdate.tensp} placeholder="Input field"/>
              <label htmlFor="">Image</label>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                >
               {fileList.length >= 8 ? null : uploadButton}
               </Upload> 
              <label htmlFor="">Price</label>
              <input type="text" className="form-control" onChange={(e) => setdataUpdate([{gia : e.target.value}]) } value={dataUpdate.gia}  placeholder="Input field"/>
              <label htmlFor="">Types</label>
              <input type="text" className="form-control" placeholder="Input field"/>

            </div>
          </form>
        </Modal>  
    </div>
  );
};

export default UserContent;
