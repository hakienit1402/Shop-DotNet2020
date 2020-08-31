import React, { useState, useEffect } from "react";
import axios from "axios";
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import { Modal,Upload,message, Input, Button  } from "antd";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
const { Search } = Input;
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
 const ProductContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      // this.setState({ loading: true });
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
        setLoading(false),
      );
    }
    
  };
  const [dataUpdate, setdataUpdate] = useState([]);
  const [searchValue, setsearchValue] = useState("")
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState([1]);
  const [dataPerPage] = useState([5]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`https://localhost:44315/api/sanphams`);
      setData(res.data);
    };
    fetchData();
  }, []);
  // current Data
  const end = currentPage * dataPerPage;
  const begin = end - dataPerPage;

  //change page number
  const paginate = (pageNumber) => setcurrentPage(pageNumber);
  //edit product
  // event Change value input field
  const onChangeData = (e) => {

    setdataUpdate({
      ...dataUpdate,
      [e.target.name] : e.target.value
    })
  }
  const onEdit = (dataEdit) => {
    console.log(dataEdit)
    setVisible(true);
    setdataUpdate(dataEdit)
    setImageUrl(dataEdit.hinhanh)
  }
  //delete product
  const onDelete = (dataEdit) => {
    
  }
// add product
const onAdd = () => {
  console.log('onAdd')
}
const uploadButton = (
  <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div className="ant-upload-text">Upload</div>
  </div>
);

const handleOk = () => {
    setconfirmLoading(true);
    
    let dataIndex = data.findIndex((x) => x.idsp === dataUpdate.idsp);
    if(dataIndex !== -1) {
      data[dataIndex].tensp = dataUpdate.tensp;
      data[dataIndex].gia = dataUpdate.gia;
      data[dataIndex].hinhanh = imageUrl;
    }
    setTimeout(() => {
      setconfirmLoading(false);
      setVisible(false);
      axios.put(`https://localhost:44315/api/sanphams/${dataUpdate.idsp}`, dataUpdate).then(res => {
        console.log(res.data)
      });
    }, 2000);
  };
  const handleCancel = () => {
    setVisible(false);
  }

  // search

  // console.log(searchValue);
  const filterDataSearch = data.filter( filterData => {
    return filterData.tensp.toLowerCase().includes(searchValue.toLowerCase())
  })
  
  // render
  return (
    <div>
       <div className="content-header" style={{display:"flex", justifyContent:"space-between", padding:10}}>
                <Button type="primary" onClick={() =>onAdd()} >Add</Button>
                <Search
                placeholder="Search sản phẩm..."
                onSearch={value => setsearchValue(value)}
                style={{ width: 300 }}
                 />
            </div>
      {searchValue !== "" ? 
      <>
      <DataTable data={filterDataSearch.slice(begin, end)} onEdit={onEdit} onDelete={onDelete}/>
      <Pagination dataPerPage={dataPerPage} totalData={filterDataSearch.length} paginate={paginate} />
      </>
      : 
      <>
      <DataTable data={ data.slice(begin, end)} onEdit={onEdit} onDelete={onDelete}/>
      <Pagination dataPerPage={dataPerPage} totalData={data.length} paginate={paginate} />
      </>
      } 
      
      
      {/* Modal edit */}
      <Modal
          title="Sửa sản phẩm"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <form>
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input type="text" className="form-control" name="tensp" onChange={onChangeData} value={dataUpdate.tensp} placeholder="Input field"/>
              <label htmlFor="">Image</label>
              {/* <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                >
               {fileList.length >= 8 ? null : uploadButton}
               </Upload>  */}
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
              <label htmlFor="">Price</label>
              <input type="text" className="form-control" name="gia" onChange={onChangeData} value={dataUpdate.gia}  placeholder="Input field"/>
              <label htmlFor="">Types</label>
              <input type="text" className="form-control" placeholder="Input field"/>

            </div>
          </form>
        </Modal>  
    </div>
  );
};

export default ProductContent;
