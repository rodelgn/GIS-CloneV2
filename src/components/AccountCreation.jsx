import React, { useState } from 'react'
import './styles/createUser.css';

const AccountCreation = () => {
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
    <div>
        <h1>Create Account</h1>

        <form action="submit" className='account-form'>
            <label>Name</label>
            <input type="text" name='name' value='name' onChange={handleChange} required/>

            <label>Email</label>
            <input type="text" name='email' value='email' onChange={handleChange} required/>

            <label>Password</label>
            <input type="password" name='password' value='password' onChange={handleChange} required/>

            <label>Confirm Password</label>
            <input type="password" name='password' value='' required/>

            <div className='form-buttons'>
                <button type='submit' className="btn-submit">Create</button>
                <button type="button" className="btn-cancel">Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AccountCreation