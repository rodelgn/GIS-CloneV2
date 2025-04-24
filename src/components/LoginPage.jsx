import React, { useState } from 'react'
import './styles/loginform.css';
import Swal from 'sweetalert2';

const LoginPage = ({ onLogin }) => {
    // const defaultUsername = 'admin';
    // const defaultPassword = '12345';
    // const [isLoading, setIsLoading] = useState(false);
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
        fetch('/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json())
        .then((data) => {
            if (data.success) {
            Swal.fire({
                title: "Successfully logged in!",
                icon: "success",
                draggable: false
            });
            onLogin(data);
        } else {
            Swal.fire({
                title: "Invalid User or Password!",
                text: "Please try again.",
                icon: "error",
                draggable: false
              });
            }
        }).catch((error) => {
            console.log("Error occurd during fetching data: ", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred while logging in.",
                icon: "error",
                draggable: false
              });
            });
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
                    {/* <a href="#">Forgot Password?</a> */}
                    <a href="#">Create User</a>
                </div>
        </form>
    </div>
  )
}

export default LoginPage