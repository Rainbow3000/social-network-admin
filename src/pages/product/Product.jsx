import React, { useState,useEffect } from 'react'
import { Box } from '@mui/system'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts,deleteProduct } from '../../redux/slices/productSlice'

const Product = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product); 
    useEffect(() => {
        dispatch(fetchProducts());
    }, [])
let navigate = useNavigate(); 

const handleDelete = (productId)=>{
    let text = "Are you sure you want to delete it ?"
    if (window.confirm(text) === true) {
         dispatch(deleteProduct(productId)); 
         alert('Delete product success !'); 
         navigate(0); 
    } else {
        text = "You canceled!";
    }
}
  return (
     <Box sx={{width:"100%",marginTop:10}}>
          <Button variant='contained' sx={{position:'fixed',right:10,top:70}}>
             <Link to="/product/create">CREATE</Link>
          </Button>
          <h2 style={{textAlign:'center'}}>PRODUCT</h2>
          <div style={{width:'20%',height:5,backgroundColor:'#333',marginLeft:'50%',transform:"translateX(-50%)"}}></div>
          <TableContainer sx={{marginTop:10,textAlign:'center'}} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell align="center">Avatar</TableCell>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Description</TableCell>
                          <TableCell align="center">Size</TableCell>
                          <TableCell align="center">Color</TableCell>
                          <TableCell align="center">Stock</TableCell>
                          <TableCell align="center">Price</TableCell>
                          <TableCell align="center">Options</TableCell>
                         
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {products.map((row) => (
                          <TableRow 
                              key={row.Id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell component="th" scope="row">
                                  {row._id}
                              </TableCell>
                              <TableCell align="center"><img style={{borderRadius:"50%"}} src={row.image} width={60} height={60} /></TableCell>
                              <TableCell align="center">{row.name}</TableCell>
                              <TableCell align="center">{row.desc}</TableCell>
                              <TableCell align="center">{
                                row.size.map((item,index)=>{
                                    return index < row.size.length - 1 ? item + ',' : item; 
                                })
                              }</TableCell>
                              <TableCell align="center">{
                                  row.color.map((item, index) => {
                                      return index < row.color.length - 1 ? item + ',' : item;
                                  })
                              }</TableCell>
                              <TableCell align="center">{row.inStock}</TableCell>
                              <TableCell align="center">{row.price}</TableCell>
                              <TableCell style={{border:'none'}} sx={{display:'flex',alignItems:'center',height:100,justifyContent:'space-between',width:120}} align="right">
                                  <DeleteOutlineOutlinedIcon style={{marginTop:40}} sx={{cursor:'pointer'}} onClick = {()=>handleDelete(row._id)} color='error'/>
                                  <Link to={`/product/product-update/${row._id}`}>
                                      <BuildCircleOutlinedIcon color='warning' style={{ marginTop: 50 }} sx={{marginRight:3,cursor:'pointer'}}/>
                                  </Link>
                              </TableCell>          
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
     </Box>
  )
}

export default Product