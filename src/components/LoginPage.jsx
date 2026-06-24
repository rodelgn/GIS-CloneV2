import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../api/Axios';
import './styles/loginform.css';
import Swal from 'sweetalert2';

const LoginPage = ({ onLogin }) => {
    const demoEmail = 'user@demo.com';
    const [formData, setFormData] = useState({
        email: demoEmail,
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
        try {
            const response = await Axios.post('/loginUser', {
                email: formData.email.trim().toLowerCase(),
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

  return (
    <div className='login-page'>
        <form className='frm-style' onSubmit={handleSubmit}>
            <div className="login-brand">
                {/* <span className="login-mark">GIS</span> */}
                <div>
                    <h2 className='form-header'>GIS Tax Map</h2>
                    <p className="form-subtitle">Demo mapping workspace</p>
                </div>
            </div>
                <div className='input-field'>
                    <label className='txt-label'>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} readOnly required />
                </div>
                <div className='input-field'>
                    <label className='txt-label'>Password</label>
                    <input type="password" name="password" placeholder='Any password' value={formData.password} onChange={handleChange} required />
                </div>

                <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage
