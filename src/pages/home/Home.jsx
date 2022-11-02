import React,{useEffect} from 'react'
import {Box,Grid} from '@mui/material'
import Featured from '../../components/featured/Featured'
import ListUser from '../../components/listUser/ListUser'
import UserChart from '../../components/chart/UserChart'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'; 
import {useNavigate} from 'react-router-dom'

import {getUsers,getUserStat} from '../../redux/slices/userSlice'
const Home = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem('user'))){
      navigate('/login')
    }
  },[])

  useEffect(()=>{
      dispatch(getUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(getUserStat());
  }, [dispatch])
  

  return (
    <Box sx={{width:"100%",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button style={{position:'absolute',width:'200px',height:'45px',backgroundColor:'blue',color:'white',border:'none',borderRadius:'5px',cursor:'pointer',right:'20px',top:'120px',fontSize:'20px'}}><Link to="/user/create">Thêm mới</Link></button>
        <Box sx={{display:"flex",justifyContent:'space-between',width:'100%',flexDirection:'column'}}>
              {/* <Featured/> */}
              <Box sx={{marginTop:5,padding:5}}>
                  <Grid spacing={2} container sx={{color:'black',display:'flex'}}>
                      <Grid item sx={{flex:1}}>
                        <ListUser/>
                      </Grid>
                      <Grid item sx={{flex:1}} >
                        <UserChart/>
                      </Grid>
                  </Grid>
              </Box>
            </Box>
        </Box>
  )
}

export default Home