import React, { useEffect, useState } from 'react';
import api from '../api';

function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await api.get('/');
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await api.delete(`/${id}`);
    getUsers(); // Refresh
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user._id}>
          {user.name} - {user.email}
          <button onClick={() => deleteUser(user._id)}>Delete</button>
          {/* Add Edit link later */}
        </div>
      ))}
    </div>
  );
}

export default UserList;