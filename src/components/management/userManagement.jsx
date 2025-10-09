import { useEffect, useState } from 'react';
import Axios from '../../api/Axios';
import "../styles/usermanagement.css";

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        Axios.get('/userDetail').then((response) => {
            setUsers(response.data);
            console.log("User Data: ", response.data)
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
        });
    }, []);


  return (
    <div className='form-container'>
      <h1>Change Password</h1>

      <div>
        <form action="">
          <label>Username:</label>
          <select name="username" id="username">
            {users.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))}
            </select>
          <label>Current Password</label>
          <input type="password" name="currentPassword" id="currentPassword" />
          <label>New Password</label>
          <input type="password" name="newPassword" id="newPassword" />
          <label>Confirm New Password</label>
          <input type="password" name="confirmNewPassword" id="confirmNewPassword" />
          <div className='button-container'>
            <button type="submit" className='submit-btn'>Submit</button>
            <button type="button" className='cancel-btn' onClick={() => {}}>Cancel</button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default UserManagement;