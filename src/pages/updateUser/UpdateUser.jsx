import React from 'react'
import './updateUser.css'
const UpdateUser = () => {
  return (
    <div className='container'>
        <h1>Cập nhật người dùng</h1>
        <form id='form' action="">
            <input placeholder='Tên người dùng' className='input' type="text" />
            <input placeholder='Mật khẩu ' className='input' type="text" />
            <input placeholder='Nhập lại mật khẩu' className='input' type="text" />
            <button className='btn-create'>Cập nhật</button>
        </form>
    </div>
  )
}

export default UpdateUser