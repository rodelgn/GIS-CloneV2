import { useEffect, useState } from 'react';
import Axios from '../../api/Axios';
import "../styles/usermanagement.css";

const UserManagement = (props) => {
    const [users, setUsers] = useState([]);
    const [newPass, setNewPass] = useState('');

    useEffect(() => {
        Axios.get('/userDetail').then((response) => {
            setUsers(response.data);
            console.log("User Data: ", response.data)
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
        });
    }, []);

    const resetPassword = () => {
      if (!newPass) {
        alert('Please enter a new password')
        return;
      }
    };

    const handleClose = () => {
        props.onClose();
    }


  return (
    <div className='form-container'>
      <h1>Change Password</h1>

      <div className='form-box'>
        <form action="" className='user-form'>
          <label>Email/User</label>
          <input type="text" name="username" id="username" disabled value={users.length > 0 ? users[0].email : ''} />
          <label>Current Password</label>
          <input type="password" name="currentPassword" id="currentPassword" />
          <label>New Password</label>
          <input type="password" name="newPassword" id="newPassword" />
          <label>Confirm New Password</label>
          <input type="password" name="confirmNewPassword" id="confirmNewPassword" />
          <div className='button-container'>
            <button type="submit" className='submit-btn' onClick={resetPassword}>Submit</button>
            <button type="button" className='cancel-btn' onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default UserManagement;