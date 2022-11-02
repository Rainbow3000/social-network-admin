import React from 'react'
import './style.css'
const CreateUser = () => {
  return (
    <div className='container'>
        <h1>Tạo tài khoản</h1>
        <form id='form' action="">
            <input placeholder='Tên người dùng' className='input' type="text" />
            <input placeholder='Email người dùng' className='input' type="text" />
            <input placeholder='Mật khẩu ' className='input' type="text" />
            <input placeholder='Nhập lại mật khẩu' className='input' type="text" />
            <button className='btn-create'>Tạo</button>
        </form>
    </div>
  )
}

export default CreateUser