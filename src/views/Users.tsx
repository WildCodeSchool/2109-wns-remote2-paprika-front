import * as React from 'react';

import Layout from '../components/Layout';
import Page from '../components/Page';
import {
  useGetAllUsersQuery,
  User,
  useDeleteUserMutation,
} from '../generated/graphql';

import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { getComparator, Order, stableSort } from '../utils/tableUtils';
import { Chip, Container, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import NewUserForm from '../components/Users/NewUserForm';
import { useSnackbar } from 'notistack';
import ModifyUserForm from '../components/Users/ModifyUserForm';

interface Data {
  email: string;
  lastName: string;
  firstName: string;
  role: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'firstName',
    label: 'Prénom',
  },
  {
    id: 'lastName',
    label: 'Nom',
  },
  {
    id: 'role',
    label: 'Rôle',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDeleteUser: () => void;
  handleOpenModal: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleDeleteUser, handleOpenModal } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          <span style={{ fontWeight: 'bold' }}>{numSelected}</span>{' '}
          {numSelected > 1
            ? 'utilisateurs sélectionnés'
            : 'utilisateur sélectionné'}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
          variant="h5"
          id="tableTitle"
          component="div"
          color="primary"
        >
          Utilisateurs
        </Typography>
      )}
      {numSelected > 0 ? (
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Supprimer">
            <IconButton onClick={handleDeleteUser}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          {numSelected === 1 ? (
            <Tooltip title="Editer">
              <IconButton onClick={handleOpenModal}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Box>
      ) : null}
    </Toolbar>
  );
};

export default function Users() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('firstName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Array<User>>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deleteUser] = useDeleteUserMutation({
    refetchQueries: ['GetAllUsers'],
  });
  const { enqueueSnackbar } = useSnackbar();

  useGetAllUsersQuery({
    onCompleted: ({ getAllUsers }) => {
      setRows(getAllUsers);
    },
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.email);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // * Modal create and modify user
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openModifyModal, setOpenModifyModal] = React.useState(false);

  const handleOpenModifyModal = () => {
    setOpenModifyModal(true);
  };

  const handleCloseModifyModal = () => {
    setOpenModifyModal(false);
  };

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const handleDeleteUser = () => {
    rows
      .filter((user) => isSelected(user.email))
      .forEach((user) => {
        deleteUser({
          variables: {
            userId: user.id,
          },
        }).then(() => {
          setSelected([]);
          enqueueSnackbar(
            `L'utilisateur ${user.firstName} a bien été supprimé !`,
            { variant: 'success' }
          );
        });
      });
  };

  return (
    <Page sx={{ height: '100vh' }} title="Utilisateurs">
      <Layout>
        <Container>
          <Box sx={{ width: '100%', mb: 9 }}>
            <NewUserForm
              handleClickOpen={handleOpenCreateModal}
              handleClose={handleCloseCreateModal}
              open={openCreateModal}
            />
            {selected.length === 1 && (
              <ModifyUserForm
                handleClickOpen={handleOpenModifyModal}
                handleClose={handleCloseModifyModal}
                open={openModifyModal}
                data={rows.find((user) => isSelected(user.email))}
              />
            )}
            <Tooltip title="Créer un utilisateur" placement="left" arrow>
              <Fab
                aria-label="add"
                onClick={handleOpenCreateModal}
                color="primary"
                sx={{
                  position: 'fixed',
                  zIndex: 1,
                  bottom: 16,
                  right: 16,
                  color: 'white',
                  fontWeight: 'bold',
                  ':hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>

            <Paper sx={{ width: '100%' }}>
              <EnhancedTableToolbar
                handleDeleteUser={handleDeleteUser}
                numSelected={selected.length}
                handleOpenModal={handleOpenModifyModal}
              />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="medium"
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.email);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event: React.MouseEvent<unknown>) =>
                              handleClick(event, row.email)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.email}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="normal"
                            >
                              {row.email}
                            </TableCell>
                            <TableCell align="left">{row.firstName}</TableCell>
                            <TableCell align="left">{row.lastName}</TableCell>
                            <TableCell align="left">
                              <Chip
                                color={
                                  row.role === 'ADMIN'
                                    ? 'secondary'
                                    : row.role === 'PO'
                                    ? 'info'
                                    : 'warning'
                                }
                                size="small"
                                sx={{ fontWeight: 700, fontSize: 11 }}
                                label={row.role}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 33 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                labelRowsPerPage="Lignes par page"
                rowsPerPageOptions={[7, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Container>
      </Layout>
    </Page>
  );
}
