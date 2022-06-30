/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Chip, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { RoleSite, User, useUpdateUserMutation } from '../../generated/graphql';
import { useSnackbar } from 'notistack';

type ModifyUserForm = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  data?: User;
};

const userRoles = ['ADMIN', 'PO', 'USER'];

export default function ModifyUserForm(props: ModifyUserForm) {
  const [userRole, setUserRole] = React.useState(props.data?.role);
  const [user, setUser] = React.useState(props.data);
  const [updateUser] = useUpdateUserMutation({
    refetchQueries: ['GetAllUsers'],
  });
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    firstname: Yup.string().required('Prénom obligatoire'),
    lastname: Yup.string().required('Nom obligatoire'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstName,
      lastname: user?.lastName,
      role: userRole,
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      updateUser({
        variables: {
          updateUserInput: {
            firstName: data.firstname,
            lastName: data.lastname,
            role: data.role,
            userId: user?.id ?? '',
          },
        },
      })
        .then(() => {
          enqueueSnackbar(
            `L'utilisateur ${formik.values.firstname} a bien été modifié !`,
            {
              variant: 'success',
            }
          );
          formik.setSubmitting(false);
          props.handleClose();
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    },
    enableReinitialize: true,
  });

  console.log(user);

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleSetUserRole = (role: any) => {
    setUserRole(role);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Modifier un utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Veuillez modifier les informations de l'utilisateur ci-dessous
          </DialogContentText>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="firstname"
                  type="text"
                  label="Prénom"
                  {...getFieldProps('firstname')}
                  error={Boolean(touched.firstname && errors.firstname)}
                  helperText={touched.firstname && errors.firstname}
                />
                <TextField
                  fullWidth
                  autoComplete="lastname"
                  type="text"
                  label="Nom"
                  {...getFieldProps('lastname')}
                  error={Boolean(touched.lastname && errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
                />
                <div>
                  <Typography sx={{ mb: 1 }}>Rôle</Typography>
                  <Stack spacing={1} direction="row">
                    {userRoles.map((role) => (
                      <Chip
                        key={role}
                        onClick={() => handleSetUserRole(role)}
                        icon={userRole === role ? <CheckIcon /> : <AddIcon />}
                        color={
                          role === 'ADMIN'
                            ? 'secondary'
                            : role === 'PO'
                            ? 'info'
                            : 'warning'
                        }
                        sx={{ fontWeight: 700, fontSize: 11 }}
                        label={role}
                      />
                    ))}
                  </Stack>
                </div>
              </Stack>

              <DialogActions sx={{ mt: 5 }}>
                <Button
                  sx={{ fontWeight: 'bold' }}
                  onClick={props.handleClose}
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Annuler
                </Button>
                <LoadingButton
                  sx={{ fontWeight: 'bold', color: 'white' }}
                  variant="contained"
                  size="small"
                  type="submit"
                  loading={isSubmitting}
                >
                  Modifier cet utilisateur
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
