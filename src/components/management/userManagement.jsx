import { useEffect, useState } from 'react';
import Axios from '../../api/Axios';
import "../styles/usermanagement.css";

const UserManagement = (props) => {
    const [users, setUsers] = useState([]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        Axios.get('/userDetail').then((response) => {
            setUsers(response.data);
            console.log("User Data: ", response.data)
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
        });
    }, []);

    const handleCurrentPasswordChange = (e) => {
      setCurrentPassword(e.target.value);
      console.log("Current Password: ", e.target.value);
    }

    const handlenNewPassChange = (e) => {
      setNewPass(e.target.value);
      console.log("New Password: ", e.target.value);
    }

    const handleConfirmNewPasswordChange = (e) => {
      setConfirmNewPassword(e.target.value);
      console.log("Confirm New Password: ", e.target.value);
    }

    const validatePassword = () => {
      if (newPass !== confirmNewPassword) {
        alert('New password and confirm password do not match');
        return false;
      } else if (newPass.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
      } else {
        return true;
      }
    };

    const resetPassword = (e) => {
      e.preventDefault();
      if (validatePassword()) {
        Axios.post('/verifyResetPassword', {
          email: users.length > 0 ? users[0].email : '',
          currentPassword: currentPassword,
          newPassword: newPass
        }).then((response) => {
          if (response.data.success) {
          alert('Password changed successfully');
          handleClose();
          }
        }).catch((error) => {
          console.error("Error changing password: ", error);
          alert('Error changing password: ' + error.response.data.message);
        });

        const resetForm = () => {
          setCurrentPassword('');
          setNewPass('');
          setConfirmNewPassword('');
        };
        resetForm();
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
          <input type="password" name="currentPassword" id="currentPassword" onChange={handleCurrentPasswordChange} />
          <label>New Password</label>
          <input type="password" name="newPassword" onChange={handlenNewPassChange} id="newPassword" />
          <label>Confirm New Password</label>
          <input type="password" name="confirmNewPassword" onChange={handleConfirmNewPasswordChange} id="confirmNewPassword"  />
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