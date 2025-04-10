import React from 'react'
import './styles/loginform.css';

const LoginPage = () => {
  return (
    <div className='login-page'>
        <form className='frm-style' action="">
            <h2 className='form-header'>GIS TAX MAP</h2> 
                <div className='input-field'>
                    <label className='txt-label'>User</label>
                    <input type="text" name="" id="" />
                </div>
                <div className='input-field'>
                    <label className='txt-label'>Password</label>
                    <input type="password" name="" id="" />
                </div>

                <button type='submit'>Login</button>

                <div className='forgot-password'>
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create User</a>
                </div>
        </form>
    </div>
  )
}

export default LoginPage