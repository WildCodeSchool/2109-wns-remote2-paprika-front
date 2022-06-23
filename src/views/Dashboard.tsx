import React from 'react';

import Layout from '../components/Layout';
import Page from '../components/Page';

const Dashboard = () => {
  return (
    <Page sx={{ height: '100vh' }} title="Dashboard">
      <Layout>
        <h1>Dashboard page</h1>
      </Layout>
    </Page>
  );
};

export default Dashboard;
