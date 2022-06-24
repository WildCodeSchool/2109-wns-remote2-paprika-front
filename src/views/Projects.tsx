import { Typography } from '@mui/material';
import React from 'react';
import { Project, useGetAllProjectsQuery } from '../generated/graphql';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Layout from '../components/Layout';
import Page from '../components/Page';

function Row(props: { row: Project }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.client}</TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">{row.startAt}</TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">
          <DeleteIcon />
          <EditIcon />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Participants
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prenom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.participants?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row?.user?.lastName}</TableCell>
                      <TableCell>{row?.user?.firstName}</TableCell>
                      <TableCell>{row?.user?.email}</TableCell>
                      <TableCell>{row?.projectRole?.name}</TableCell>
                      <TableCell>
                        <DeleteIcon />
                        <EditIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Projects() {
  const [projects, setProjects] = React.useState<Array<any>>([]);
  const { loading } = useGetAllProjectsQuery({
    onCompleted: ({ getAllProjects }) => {
      setProjects(getAllProjects);
    },
  });
  return (
    <Page sx={{ height: '100vh' }} title="Utilisateurs">
      <Layout>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nom</TableCell>
                <TableCell align="right">Client</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Date du début</TableCell>
                <TableCell align="right">Date de fin</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </Page>
  );
}
