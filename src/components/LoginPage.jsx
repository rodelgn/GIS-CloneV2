import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../api/Axios';
import './styles/loginform.css';
import Swal from 'sweetalert2';
import AccountCreation from './CreateAccount/AccountCreation';

const LoginPage = ({ onLogin }) => {
    // const defaultUsername = 'admin';
    // const defaultPassword = '12345';
    // const [isLoading, setIsLoading] = useState(false);
    const [showAccountCreation, setShowAccountCreation] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigateToHome = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        try {
            const response = await Axios.post('/loginUser', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.status === 'ok') {
                Swal.fire({
                    title: "Successfully logged in!",
                    icon: "success",
                    draggable: false
                });
                onLogin(response.data.user);
                navigateToHome('/home');
            }
        } catch (error) {
            console.error('Login failed:', error);
            Swal.fire({
                icon: "error",
                title: "Invalid User or Password!",
                text: error.response?.data?.message || 'Invalid email or password',
                draggable: false
            });
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (formData.username === defaultUsername && formData.password === defaultPassword) {
    //         Swal.fire({
    //             title: "Successfully logged in!",
    //             icon: "success",
    //             draggable: false
    //           });

    //         onLogin();
    //     } else {
    //         Swal.fire({
    //             title: "Invalid User or Password!",
    //             text: "Please try again.",
    //             icon: "error",
    //             draggable: false
    //           });
    //     }
    // };


  return (
    <div className='login-page'>
        <form className='frm-style' onSubmit={handleSubmit}>
            <h2 className='form-header'>GIS TAX MAP</h2> 
                <div className='input-field'>
                    <label className='txt-label'>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className='input-field'>
                    <label className='txt-label'>Password</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>

                <button type='submit'>Login</button>

                <div className='forgot-password'>
                    {/* <a href="#">Forgot Password?</a> */}
                    <a href="#" onClick={() => setShowAccountCreation(true)}>Create User</a>
                </div>
        </form>

        {showAccountCreation && (
        <AccountCreation onClose={() => setShowAccountCreation(false)} />
      )}

    </div>
  )
}

export default LoginPage