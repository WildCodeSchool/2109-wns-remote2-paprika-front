import * as React from 'react';
import * as yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Project, RoleSite, User , useUpdateProjectMutation } from '../../generated/graphql';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LoadingButton } from '@mui/lab';
import { Chip, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

type editProjectForm = {
  handleClickOpen: () => void;
  handleClose: () => void;
  open: boolean;
  data?: Project;
};

export default function editProjectForm(props: editProjectForm) {
  const [project, setProject] = React.useState(props.data);
  const [updateProject] = useUpdateProjectMutation({
    refetchQueries: ['GetAllProjects'],
  });
  const { enqueueSnackbar } = useSnackbar();

  const LoginSchema = yup.object().shape({
    nameProject: yup
    .string()
    .required('Ce champs est requis'),
    descriptionProject: yup
    .string()
    .required('Ce champs est requis'),
    clientProject: yup
    .string()
    .required('Ce champs est requis'),
  });

  const formik = useFormik({
    initialValues: {
        idProject: project?.id,
        nameProject: project?.name,
        descriptionProject: project?.description,
        clientProject: project?.client,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await updateProject({
        variables: {
            projectId: values.idProject!,
            updateProjectInput: {
                name: values.nameProject,
                client: values.clientProject,
                description: values.descriptionProject,
            },
        },
      })
        .then(() => {
          enqueueSnackbar(
            `Le projet ${values.nameProject} a été modifié avec succès`,
            {
              variant: 'success',
            }
          );
          formik.setSubmitting(false);
          props.handleClose();
        })
        .catch((error :any) => {
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    },
    enableReinitialize: true,
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle sx={{ pb: 0 }}>Modifier un projet</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Modification du projet {project?.name}
          </DialogContentText>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="nameProject"
                  type="text"
                  label="Nom du projet"
                  {...getFieldProps('nameProject')}
                  error={Boolean(touched.nameProject && errors.nameProject)}
                  helperText={touched.nameProject && errors.nameProject}
                />
                <TextField
                  fullWidth
                  autoComplete="descriptionProject"
                  type="text"
                  label="Description du projet"
                  {...getFieldProps('descriptionProject')}
                  error={Boolean(touched.descriptionProject && errors.descriptionProject)}
                  helperText={touched.descriptionProject && errors.descriptionProject}
                />
                <TextField
                  fullWidth
                  autoComplete="clientProject"
                  type="text"
                  label="Client"
                  {...getFieldProps('clientProject')}
                  error={Boolean(touched.clientProject && errors.clientProject)}
                  helperText={touched.clientProject && errors.clientProject}
                />
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
                  Modifier ce projet
                </LoadingButton>
              </DialogActions>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}