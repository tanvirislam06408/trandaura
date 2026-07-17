import { getAllUsers } from '@/lib/api/user';
import React from 'react';
import ManageUsersPage from './ManageUsersPage';

const MangeUsers = async() => {
  const users=await getAllUsers();

  return (
    <div>
        <ManageUsersPage users={users}/>
    </div>
  );
};

export default MangeUsers;