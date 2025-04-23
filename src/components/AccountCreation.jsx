import React from 'react'

const AccountCreation = () => {
  return (
    <div>
        <h1>Create Account</h1>

        <form action="" className='account-form'>
            <label>Name</label>
            <input type="text" name='name' required/>

            <label>Email</label>
            <input type="text" name='email' required/>

            <label>Password</label>
            <input type="password" name='password' required/>

            <label>Confirm Password</label>
            <input type="password" name='password' required/>

            <div className='form-buttons'>
                <button type='submit' className="btn-submit">Create</button>
                <button type="button" className="btn-cancel">Cancel</button>
            </div>
        </form>
    </div>
  )
}

export default AccountCreation