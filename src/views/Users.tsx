import React, { useEffect } from 'react';
import { useGetAllUsersQuery } from '../generated/graphql';

const Users = () => {
  const { error, loading, data } = useGetAllUsersQuery();

  useEffect(() => {
    console.log(data?.getAllUsers);
  }, [data]);

  return <h1>Users</h1>;
};

export default Users;
