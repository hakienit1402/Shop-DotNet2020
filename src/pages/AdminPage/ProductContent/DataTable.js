import React from 'react'
import {Button} from 'antd';

export const DataTable = ({data,onEdit,onDelete}) => {
    return (
        <div>
           
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>IMAGE</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item)=>(
                        <tr key={item.idsp}>
                            <td> {item.idsp} </td>
                            <td> {item.tensp} </td>
                            <td> <img src={item.hinhanh} alt="" style={{width:50,height:80}}/> </td>
                            <td> {item.gia}</td>
                            <td> {item.sl}</td>
                            <td> 
                            <Button type="primary" onClick={() =>onEdit(item)}>Sửa</Button>
                            <Button type="primary"onClick={() =>onDelete(item)}>Xóa</Button>
                            </td>

                        </tr>
                    )
                    
                    
                    )}
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
            
        </div>
    )
}
