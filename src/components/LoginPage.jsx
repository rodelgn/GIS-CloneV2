import React, {useState} from 'react'
import './styles/loginform.css';
import Swal from 'sweetalert2';

const LoginPage = ({ onLogin }) => {
    const defaultUsername = 'admin';
    const defaultPassword = '12345';

    

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username === defaultUsername && formData.password === defaultPassword) {
            Swal.fire({
                title: "Successfully logged in!",
                icon: "success",
                draggable: false
              });

            onLogin();
        } else {
            alert('Invalid username or password!');
        }
    };


  return (
    <div className='login-page'>
        <form className='frm-style' onSubmit={handleSubmit}>
            <h2 className='form-header'>GIS TAX MAP</h2> 
                <div className='input-field'>
                    <label className='txt-label'>User</label>
                    <input type="username" name="username" onChange={handleChange} required />
                </div>
                <div className='input-field'>
                    <label className='txt-label'>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
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