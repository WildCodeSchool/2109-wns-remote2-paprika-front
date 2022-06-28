import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  useGetCurrentUserLazyQuery,
  useLoginMutation,
} from '../generated/graphql';
import Iconify from './Iconify';

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [login] = useLoginMutation({
    onCompleted: () => {
      navigate('/dashboard');
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [getCurrentUser] = useGetCurrentUserLazyQuery({
    onCompleted: ({ getCurrentUser }) => {
      if (getCurrentUser) navigate('/dashboard');
    },
  });

  React.useEffect(() => {
    getCurrentUser();
  }, []);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(`L'email doit être une adresse email valide`)
      .required('Email obligatoire'),
    password: Yup.string().required('Mot de passe obligatoire'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (value) => {
      await login({
        variables: {
          userLoginInput: {
            email: value.email,
            password: value.password,
          },
        },
      });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ width: '60%' }}
      >
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
                      type={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...getFieldProps('remember')}
                checked={values.remember}
              />
            }
            label="Rester connecté"
          />

          <Link
            component={RouterLink}
            variant="subtitle2"
            to="#"
            underline="hover"
          >
            Mot de passe oublié ?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Se connecter
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
