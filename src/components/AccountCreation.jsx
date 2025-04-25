import React, { useState, useEffect } from 'react'
import './styles/createUser.css';

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
    }


  return (
    <div className='modal-overlay' onClick={onClose}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <h1>Create Account</h1>
        <form action="submit" className='account-form'>
            <label>Name</label>
            <input type="text" name='name' onChange={handleChange} required/>

            <label>Email</label>
            <input type="text" name='email' onChange={handleChange} required/>

            <label>Password</label>
            <input type="password" name='password' onChange={handleChange} required/>

            <label>Confirm Password</label>
            <input type="password" name='password' required/>

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