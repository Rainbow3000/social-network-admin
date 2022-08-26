import React,{useEffect,useState} from 'react'
import './orderList.scss'
import {Box, Paper} from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useDispatch,useSelector} from 'react-redux'
import {getOrderUser,updateOrderUser} from '../../redux/slices/orderSlice'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {getOrderCompareStat,exportToExcel} from '../../redux/slices/orderSlice'

import {
  useNavigate
} from "react-router-dom";
import {Link} from "react-router-dom"
import { BarChart, Bar,XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const stateOrder = [
  "Pending", "WaitingForDelivery",
  "Delivering", "Success","Cancelled"
]




const OrderList = () => {
  const iState = JSON.parse(localStorage.getItem('indexState')); 
  const oState = JSON.parse(localStorage.getItem('orderState')); 
  const [indexState,setIndexState] = useState( iState && iState); 
  const [orderState, setOrderState] = useState( oState && oState);
  localStorage.setItem('indexState', JSON.stringify(indexState));  
  localStorage.setItem('orderState', JSON.stringify(orderState));  
  const dispatch = useDispatch(); 
  let navigate = useNavigate(); 
  const {orders} = useSelector(state=>state.order); 
  const {orderCompare} = useSelector(state=>state.order); 
  const ordersPending = orders.filter(item=>{
    return item.status === "Pending"
  })
  const orderWaitingDelivery = orders.filter(item => {
    return item.status === "Waiting Delivery"
  })
  const orderDelivering = orders.filter(item => {
    return item.status === "Delivering"
  })
  const orderSuccess = orders.filter(item => {
    return item.status === "Success"
  })

  const orderCancel = orders.filter(item => {
    return item.status === "Cancelled"
  })
  const handleConfirmOrder = (orderId)=>{
      const userOrder = orders.find(item=>{
        return item._id === orderId; 
      }); 
      const order = {...userOrder,status:"Waiting Delivery"}
      dispatch(updateOrderUser({data:order,orderId}));
      navigate(0);
  }
  const handleDelivery= (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Delivering" }

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }
  const handleSuccess = (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Success",isPaid:true}

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }
  const handleCancel = (orderId) => {
    const userOrder = orders.find(item => {
      return item._id === orderId;
    });
    const order = { ...userOrder, status: "Cancelled" }

    dispatch(updateOrderUser({ data: order, orderId }));
    navigate(0);
  }

  const handleClickState = (item,index)=>{
       setOrderState(item);
       setIndexState(index); 
  }

  const currentMonth = new Date().getMonth() + 1;
  const listSuccess = orderCompare && orderCompare.orderSuccess; 
  const listCancel = orderCompare && orderCompare.orderCancelled; 
  let newListSuccess = listSuccess && [...listSuccess]; 
  let newListCancel = listCancel && [...listCancel]; 
  for(let i = 1; i <= currentMonth ; i++){
    const dataFind = listSuccess && listSuccess.find(item=>{
        return item._id === i; 
      })
      if(!dataFind){
        newListSuccess && newListSuccess.push({_id:i,totalSuccess:0}); 
        newListSuccess  = newListSuccess && newListSuccess.sort((a,b)=>a._id - b._id); 
      }
  }
  for (let i = 1; i <= currentMonth; i++) {
    const dataFind = listCancel && listCancel.find(item => {
      return item._id === i;
    })
    if (!dataFind) {
      newListCancel && newListCancel.push({ _id: i, totalCancelled: 0 });
      newListCancel = newListCancel && newListCancel.sort((a, b) => a._id - b._id);
    }
  }

  const data = newListSuccess && newListSuccess.map((item,index)=>{
      return {
        name:item._id, 
        success:item.totalSuccess, 
        cancel:newListCancel[index].totalCancelled,
      }
  })

 
  const handleExportExcel = ()=>{  
      dispatch(exportToExcel(orderSuccess)); 
      alert('Export to excel success !'); 
  }

  useEffect(()=>{
      dispatch(getOrderUser()); 
      dispatch(getOrderCompareStat()); 
  },[dispatch])
  return (
    <>
      <Paper className='order-list-charts' sx= {{width:"80%",height:'300px'}}>
          <h3>Order Charts</h3>
          <div style={{width:'30%',height:5,backgroundColor:'#333',margin:20}}></div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="success" fill="green" />
            <Bar dataKey="cancel" fill="orangered" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
      <Box className='order-list-container'>
            <h3 style={{textAlign:'center',margin:20}}>List Orders</h3>
        <div style={{ width: '30%', height: 5, backgroundColor: '#333',marginBottom: 20 }}></div>
            <ul>
                {
                  stateOrder.map((item,index)=>{
                    return <li className={indexState === index ?"index-active":""} onClick={()=>handleClickState(item,index)}>{item}</li>
                  })
                }
            </ul>
            <Box sx= {{mt:5,width:'100%'}}>
              {
            orderState === "Pending" && <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Time Order</TableCell>
                      <TableCell align="center">Type Pay</TableCell>
                      <TableCell align="center">PaidFor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersPending.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 },height:120 }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >No Paid</span>}</TableCell>
                        <TableCell align="center">{
                          row.status === "Success" ? <span style={{ backgroundColor:"#86eb34"}}>{row.status}</span>:
                            <span style={{ backgroundColor: "#86eb34" }}>{row.status}</span>
                        }</TableCell>

                        <TableCell sx={{ display: 'flex',alignItems:'center' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, marginTop:40 }}><VisibilityOutlinedIcon />View</button></Link>
                          <button onClick={() => handleConfirmOrder(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5,  marginTop:40 }} >Confirm <CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5,marginTop: 40 }}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }

              {
            orderState === "WaitingForDelivery" && <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Time Order</TableCell>
                      <TableCell align="center">Type Pay</TableCell>
                      <TableCell align="center">PaidFor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderWaitingDelivery.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >No Paid</span>}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>

                        <TableCell sx={{ display: 'flex' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }}><VisibilityOutlinedIcon />View</button></Link>
                          <button onClick={() => handleDelivery(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }} >Delivery <CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5, mt: 5 }}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }
              {

            orderState === "Delivering" && <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Time Order</TableCell>
                      <TableCell align="center">Type Pay</TableCell>
                      <TableCell align="center">PaidFor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDelivering.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >No Paid</span>}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>

                        <TableCell sx={{ display: 'flex' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }}><VisibilityOutlinedIcon />View</button></Link>
                          <button onClick={() => handleSuccess(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }} >Success <CheckOutlinedIcon sx={{ color: 'green' }} /></button>
                          <button onClick={() => handleCancel(row._id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: 10, color: 'red', background: 'none', borderRadius: 5, mt: 5 }}><DeleteOutlineOutlinedIcon /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

              }

              {

            orderState === "Success" && <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Time Order</TableCell>
                      <TableCell align="center">Type Pay</TableCell>
                      <TableCell align="center">PaidFor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderSuccess.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >No Paid</span>}</TableCell>
                        <TableCell align="center">{row.status}</TableCell>

                        <TableCell sx={{ display: 'flex' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }}><VisibilityOutlinedIcon />View</button></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <button onClick={()=>handleExportExcel()} className='btn-export-excel' >Export To Excel</button>
            </Paper>
              }
              {

            orderState === "Cancelled" && <Paper>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order Id</TableCell>
                      <TableCell align="center">User Name</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Time Order</TableCell>
                      <TableCell align="center">Type Pay</TableCell>
                      <TableCell align="center">PaidFor</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Options</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderCancel.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell>
                        <TableCell align="center">{row.userName}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.orderDate}</TableCell>
                        <TableCell align="center">{row.methodPay}</TableCell>

                        <TableCell align="center">{row.isPaid === true ? <span style={{ color: 'green', fontWeight: 'bold' }}>Paid</span> : <span style={{ color: 'red', fontWeight: 'bold' }} >No Paid</span>}</TableCell>
                        <TableCell sx={{color:'red',fontWeight:'bold'}} align="center">{row.status}</TableCell>

                        <TableCell sx={{ display: 'flex' }} align="center">
                          <Link to={`/order/details/${row._id}`}><button style={{ height: 30, marginRight: 10, fontSize: 18, display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }}><VisibilityOutlinedIcon />View</button></Link>
                          <button onClick={() => handleConfirmOrder(row._id)} style={{ height: 30, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 'bold', background: 'none', borderRadius: 5, mt: 5 }} >Delivery <CheckOutlinedIcon sx={{ color: 'green' }} /></button> 
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
              }
            </Box>
      </Box>
   
    </>
  )
}

export default OrderList

