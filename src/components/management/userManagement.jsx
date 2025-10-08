import { useEffect, useState } from 'react';
import Axios from '../../api/Axios';

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
    <div>userManagement</div>
  );
};

export default UserManagement;