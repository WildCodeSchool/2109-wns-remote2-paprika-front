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
import {
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import Iconify from '../Iconify';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { RoleSite, useRegisterMutation } from '../../generated/graphql';
import { useSnackbar } from 'notistack';

type NewUserFormProps = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

const userRoles = ['ADMIN', 'PO', 'USER'];

const NewUserForm = (props: NewUserFormProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userRole, setUserRole] = React.useState('USER');
  const [register] = useRegisterMutation({ refetchQueries: ['GetAllUsers'] });
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(`L'email doit être une adresse email valide`)
      .required('Email obligatoire'),
    password: Yup.string().required('Mot de passe obligatoire'),
    firstname: Yup.string().required('Prénom obligatoire'),
    lastname: Yup.string().required('Nom obligatoire'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      role: userRole,
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      data.role = userRole;

      register({
        variables: {
          userCreateInput: {
            email: data.email,
            password: data.password,
            firstName: data.firstname,
            lastName: data.lastname,
            role: data.role as RoleSite,
          },
        },
      }).then(() => {
        enqueueSnackbar(
          `L'utilisateur ${formik.values.firstname} a bien été créé !`,
          { variant: 'success' }
        );
        formik.resetForm();
        setUserRole('USER');
        formik.setSubmitting(false);
        props.handleClose();
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSetUserRole = (role: React.SetStateAction<string>) => {
    setUserRole(role);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Créer un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Veuillez entrer les informations de l'utilisateur ci-dessous
          </DialogContentText>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  type="email"
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Mot de passe"
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword} edge="end">
                          <Iconify
                            type={
                              showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
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
                  Créer un utilisateur
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewUserForm;
