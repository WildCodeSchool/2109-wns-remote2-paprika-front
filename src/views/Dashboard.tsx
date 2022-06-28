import { Button } from '@mui/material';
import React from "react";

import Layout from '../components/Layout';
import Page from '../components/Page';
import { useLogoutMutation } from '../generated/graphql';

const Dashboard = () => {
  const [logout] = useLogoutMutation();

  return (
    <Page sx={{ height: '100vh' }} title="Dashboard">
      <Layout>
        <>
          <h1>Dashboard page</h1>
          <Button
            onClick={() => {
              logout();
            }}
          >
            Déconnexion
          </Button>
        </>
      </Layout>
    </Page>
  );
};

export default Dashboard;
