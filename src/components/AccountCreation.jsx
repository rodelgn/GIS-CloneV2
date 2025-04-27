import React, { useState, useEffect } from 'react'
import './styles/createUser.css';
import Swal from 'sweetalert2';
import Axios from '../api/Axios';

const AccountCreation = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

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
            const response = await Axios.post('/userDetail', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            console.log(response.data);
            if (response.data.status === 'ok') {
                Swal.fire({
                    title: "Account successfuly created!",
                    icon: "success",
                    draggable: false
                }).then(() => {
                    onClose();
                });
            }
        } catch (error) {
            console.error('Account creation failed:', error);
            alert('Error creating account. Please try again.');
        }
    };


  return (
    <div className='modal-overlay' onClick={onClose}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h1>Create Account</h1>
        
        <form action="submit" className='account-form' onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleChange} required/>

            <label>Email</label>
            <input type="text" name='email' value={formData.email} onChange={handleChange} required/>

            <label>Password</label>
            <input type="password" name='password' value={formData.password} onChange={handleChange} required/>

            {/* <label>Confirm Password</label>
            <input type="password" name='password' required/> */}

            <div className='form-buttons'>
                <button type='submit' className="btn-submit">Create</button>
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default AccountCreation