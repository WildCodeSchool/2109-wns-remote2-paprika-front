import { Typography } from '@mui/material';
import React from 'react';
import { User ,
  Project,
  useCreateProjectMutation,
  useGetAllProjectsQuery ,
  useUpdateProjectMutation ,
  useDeleteProjectMutation}
  from '../generated/graphql';
import Layout from '../components/Layout';
import Page from '../components/Page';
import NewProjectForm from '../components/project/NewProjectForm';
import { useSnackbar } from 'notistack';
import EditProjectForm from '../components/project/editProjectForm';
import { getComparator, Order, stableSort } from '../utils/tableUtils';
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
import AddIcon from '@mui/icons-material/Add';
import { Chip, Fab } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
export interface DataFormProject {
  nameProject: string;
  descriptionProject: string;
  clientProject: string;
}

interface HeadCell {
  id: keyof DataFormProject;
  label: string;
}

export interface ProjectProps {
  project: Project;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nameProject',
    label: 'NameProject',
  },
  {
    id: 'descriptionProject',
    label: 'DescriptionProject',
  },
  {
    id: 'clientProject',
    label: 'ClientProject',
  },
];

function Row(props: { row: Project }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [ openUpdate , setOpenUpdate ] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteProject] = useDeleteProjectMutation({
    refetchQueries: ['GetAllProjects'],
  });

  const [updateProject] = useUpdateProjectMutation({
    refetchQueries: ['GetAllProjects'],
  });

  const handleDeleteProject = () => {
    deleteProject({
      variables: {
        projectId: props.row.id,
      },
    }).then(() => {
      enqueueSnackbar(
        `Le projet ${props.row.name} à bien été supprimé !`,
        { variant: 'success' }
      );
    });
  };

  const handleUpdateProject = async () => {
    setOpen(true);

    await updateProject({
      variables: {
        projectId: props.row.id,
        updateProjectInput: {
          name: props.row.name,
          client: props.row.client,
          description: props.row.description,
        },
      },
    })
  }
  
  const handleOpenModifyModal = () => {
    setOpen(true);
  };

  const handleCloseModifyModal = () => {
    setOpen(false);
  };

  const date = new Date(row.startAt);
  const newDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

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
        <TableCell align="center">{row.client}</TableCell>
        <TableCell align="center">{row.description}</TableCell>
        <TableCell align="center">{newDate}</TableCell>
        <TableCell align="center">{newDate}</TableCell>
        <TableCell align="center">
          {row.participants != undefined && row.participants.length > 1 
            ? row.participants?.map((participant) => (
              <Chip key={participant?.user?.id} label={participant?.user?.firstName} />
            ))
            : 'Pas de participants inscrits'
          }
          </TableCell>
        <TableCell align="center">
          <IconButton onClick={handleDeleteProject}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleUpdateProject}>
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditProjectForm
        handleClickOpen={handleOpenModifyModal}
        handleClose={handleCloseModifyModal}
        open={open}
        data={props.row}
      />
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
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Rôle</TableCell>
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
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Array<Project>>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModifyModal, setOpenModifyModal] = React.useState(false);
  const [deleteProject] = useDeleteProjectMutation({
    refetchQueries: ['GetAllProjects'],
  });
  const [createProject] = useCreateProjectMutation({
    refetchQueries: ['GetAllProjects']
  });
  const { enqueueSnackbar } = useSnackbar();
  const dataOnFormProject = React.useRef<DataFormProject>({
    nameProject: '',
    clientProject: '',
    descriptionProject: '',
  });

  const handleClickOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModifyModal = () => {
    setOpenModifyModal(true);
  };
  const handleCloseModifyModal = () => {
    setOpenModifyModal(false);
  };
  const [projects, setProjects] = React.useState<Array<any>>([]);
  const { loading } = useGetAllProjectsQuery({
    onCompleted: ({ getAllProjects }) => {
      setProjects(getAllProjects);
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page sx={{ height: '100vh' }} title="Projet">
      <Layout>
        <Box sx={{ width: '100%' }}>
            <NewProjectForm
              handleClickOpen={handleClickOpenModal}
              handleClose={handleCloseModal}
              open={open}
            />
            <Fab
              variant="extended"
              aria-label="add"
              onClick={handleClickOpenModal}
              sx={{
                position: 'absolute',
                bottom: '4%',
                right: '2%',
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
                ':hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Créer un projet
            </Fab>

            <Paper sx={{ width: '100%', mb: 2 }}>
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
                    <TableCell align="right">Participants</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((row, index) => (
                    <Row key={index} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="Lignes par page"
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>
        </Box>
      </Layout>
    </Page>
  );
}