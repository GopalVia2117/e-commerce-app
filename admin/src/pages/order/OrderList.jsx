import React, {useState, useEffect} from 'react';
import { request } from '../../requestMethods';
import {Link} from "react-router-dom";
import { DeleteOutline } from '@material-ui/icons';
import { DataGrid } from '@material-ui/data-grid';
import "./orderList.css";
import axios from 'axios';
import { useToken } from '../../hooks/useToken';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../redux/orderRedux';

const Order = () => {
const TOKEN = useToken();
const orders = useSelector(state => state.orders.orders);


  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "userId",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.userId}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
        field: "createdAt",
        headerName: "Date",
        width: 160,
      },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <Link to={"/product/" + params.row._id}>
      //         <button className="productListEdit">Edit</button>
      //       </Link>
      //     </>
      //   );
      // },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150
    }
  ];
  return (
    <div className="orderList">
    {orders &&
    <DataGrid
      rows={orders}
      disableSelectionOnClick
      columns={columns}
      getRowId={(row) => row._id}
      pageSize={8}
      checkboxSelection
    />
    }
  </div>
  )
}

export default Order;