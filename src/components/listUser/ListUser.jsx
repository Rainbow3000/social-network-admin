import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import {AiOutlineDelete} from 'react-icons/ai'
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import {SlNote} from 'react-icons/sl'
import "./listUser.scss";
const ListUser = () => {
  const { users } = useSelector((state) => state.user);
  console.log(users);
  return (
    <Paper
      className="paper-list-user"
      sx={{
        width: "100%",
        height: 500,
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Table className="user-table">
        <tr>
          <th>UserName</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        {users &&
          users.user.map((item) => {
            return (
              <tr>
                <td style={{ color: "#333" }}>{item.username}</td>
                <td style={{ color: "#333" }}>{item.email}</td>
                <td style={{ color: "green" }}> active </td>
                <td>
                  <Link to="/user/update"><SlNote style={{color:'#fccf03'}}/></Link>
                  <Link to=""><AiOutlineDelete style={{color:'red',marginLeft:'20px'}}/></Link>
                </td>
              </tr>
            );
          })}
      </Table>
    </Paper>
  );
};

export default ListUser;
