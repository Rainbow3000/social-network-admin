import {React,useEffect,useState,useRef} from 'react'
import {Box,Paper} from '@mui/material'
import { useForm } from "react-hook-form";
import {userLogin} from '../../redux/slices/userSlice'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './login.scss'
const Login = () => {
  const {errorMessage,user}  = useSelector(state=>state.user)
  const dispatch = useDispatch(); 
  let navigate = useNavigate();  
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            navigate('/');
        }
    }, [])
  const onSubmit = (data)=>{
        dispatch(userLogin(data));   
        setValue("password",""); 
   }

   if(user){
     navigate('/'); 
   }

  return (
     <Box className='login-container'>
        <img src="https://cdn.pixabay.com/photo/2016/03/27/19/57/cold-1284028_960_720.jpg" className='img-container'/>
        <h2 style={{zIndex:999999,marginTop:150}}>ADMIN LOGIN</h2>
          <div style={{ width: '20%', height: 5, backgroundColor: '#333', marginBottom: 20, zIndex: 999999 }}></div>
        <Paper className='login-container-main'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <span style={{textAlign:'center',color:'red',marginTop:10}}>{errorMessage.login}</span>
                    <label>Email</label>
                    <span className='error-login'>{errors.email?.type==="required" && "Email is required !"}</span>
                    <span className='error-login'>{errors.email?.type === "pattern" && "email is invalid!"}</span>
                    <input name='email' type="email" placeholder='Your email...' {...register("email",{
                        required: true,pattern: /^[A-Z0-9 ._%+-]+@[A-Z0-9 .-]+\.[A-Z]{2,}$/i
                    })}/>
                </div>
                 <div>
                    <label>Password</label>
                    <span className='error-login'>{errors.password?.type === "required" && "Password is required !"}</span>
                    <span className='error-login'>{errors.password?.type === "minLength" && "Password must be least 8 character!"}</span>
                    <input onChange={e=>setValue("password",e.target.value)} name='password' type="password" placeholder='Your password...' {...register("password",{
                        required:true,minLength:8
                    })}/>
                </div>
                <button>LOGIN</button>
            </form>
        </Paper>
     </Box>
  )
}

export default Login