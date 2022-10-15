import React from 'react'
import Box from '@mui/material/Box'
import { Container} from '@mui/system'
import { Toolbar,AppBar,Typography,IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Badge from '@mui/material/Badge';
import {useDispatch,useSelector} from 'react-redux'
import {userLogout} from '../../redux/slices/userSlice'
import {useNavigate,Link} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const {messages}  = useSelector(state=>state.message);  
  const handleLogout = ()=>{
    dispatch(userLogout()); 
    navigate('/login'); 
  }
  return (
      <Box sx={{backgroundColor:'white'}}>
          <Box>
              <AppBar sx={{ width:"80%", backgroundColor:"#333",top:0}} position="fixed">
                    <Toolbar>
                            <IconButton sx={{color:'white'}}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div">
                                Dashboard
                            </Typography>
                            <Paper component="form"  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,marginLeft:20,flexGrow:1 }}>
                                <InputBase sx={{ ml: 1, flex: 1 }}
                                    placeholder="Search here... "
                                    inputProps={{ 'aria-label': 'search' }}>
                                </InputBase>
                                <IconButton sx={{ p: '10px' }} aria-label="menu">
                                    <SearchIcon/>
                                </IconButton>
                            </Paper>
                             <Box sx={{width:"30%",display:'flex',justifyContent:"flex-end"}}>                                   
                                <IconButton edge="start" sx={{marginRight:5}}>
                                    <Badge badgeContent={messages.length} color="error" sx={{cursor:'pointer' }}>
                                  <Link to="/message"><EmailOutlinedIcon sx={{ color: "white" }} /></Link>   
                                    </Badge>
                                </IconButton>
                                <IconButton sx={{marginRight:5}}>
                                    <Badge badgeContent={3} color="error" sx={{cursor:'pointer' }}>
                                        <NotificationsNoneOutlinedIcon sx={{color:"white"}}/>   
                                    </Badge>  
                                </IconButton>
                                <IconButton>
                                    <AccountCircleOutlinedIcon sx={{cursor: 'pointer',color:"white" }} />                       
                                </IconButton>
                                <IconButton onClick={handleLogout}>
                                    <LogoutOutlinedIcon sx={{ cursor: 'pointer', color: "white" }} />
                                </IconButton>
                             </Box>
                    </Toolbar>
                </AppBar>
          </Box>
     </Box>
  )
}

export default Navbar