import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import Page from '../components/Page';
import { useGetAllUsersQuery } from '../generated/graphql';

const Users = () => {
  const { error, loading, data } = useGetAllUsersQuery();

  useEffect(() => {
    console.log(data?.getAllUsers);
  }, [data]);

  return (
    <Page sx={{ height: '100vh' }} title="Utilisateurs">
      <Layout>
        <h1>Users page</h1>
      </Layout>
    </Page>
  );
};

export default Users;
