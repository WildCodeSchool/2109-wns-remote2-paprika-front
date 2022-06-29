import * as React from 'react';
import { Project, useCreateProjectMutation, useGetAllProjectsQuery , useUpdateProjectMutation , useDeleteProjectMutation} from '../generated/graphql';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';
import { create } from 'domain';

type NewProjectFormProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
    handleCreate: () => void;
    open: boolean;
}

const validationSchema = yup.object().shape({
    nameProject: yup
      .string()
      .required('Ce champs est requis'),
    descriptionProject: yup
      .string()
      .required('Password is required'),
    clientProject: yup
      .string()
      .required('Ce champs est requis'),
  });
  
  const NewProjectForm = (props: NewProjectFormProps) => {

    const [createProject] = useCreateProjectMutation({
        onCompleted: () => {
          console.log('test');
        },
        onError: (e) => {
          console.log(e);
        },
      });


    const formik = useFormik({
        initialValues: {
            nameProject: 'test',
            descriptionProject: 'test1',
            clientProject: 'test2',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('values', values);
            await createProject({
                variables: {
                    projectInput: {
                        name: values.nameProject,
                        client: values.clientProject,
                        description: values.descriptionProject,
                    },
                },
            });
        },
    });
    const { errors, values, handleSubmit, getFieldProps } =
    formik;

    return (
        <div>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                <Dialog open={props.open} onClose={props.handleClose}>
                    <DialogTitle>Créer un nouveau projet</DialogTitle>
                        <DialogContent>
                            <DialogContent>
                                Pour créer un nouveau projet remplir ce formulaire
                            </DialogContent>
                            <TextField
                                margin="dense"
                                id="nameProject"
                                label="Nom du projet"
                                type="nameProject"
                                fullWidth
                                variant="standard"
                                {...getFieldProps('nameProject')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="taskProject"
                                label="Task du projet"
                                type="taskProject"
                                fullWidth
                                variant="standard"
                                {...getFieldProps('taskProject')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="clientProject"
                                label="Client du projet"
                                type="clientProject"
                                fullWidth
                                variant="standard"
                                {...getFieldProps('clientProject')}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={props.handleClose}>Annuler</Button>
                            <Button type="submit" onClick={props.handleClose}>Créer</Button>
                        </DialogActions>
                    </Dialog>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default NewProjectForm;