import * as React from 'react';
import { useCreateProjectMutation } from '../../generated/graphql';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type NewProjectFormProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
    open: boolean;
}

// start componenent
const NewProjectForm = (props: NewProjectFormProps) => {

    const [createProject] = useCreateProjectMutation({
        refetchQueries: ['GetAllProjects']
      });

    const {enqueueSnackbar} = useSnackbar();
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
  
    const formik = useFormik({
        initialValues: {
            nameProject: 'Nom du projet',
            descriptionProject: 'Description du projet',
            clientProject: 'Client du projet',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await createProject({
                variables: {
                    projectInput: {
                        name: values.nameProject,
                        client: values.clientProject,
                        description: values.descriptionProject,
                    },
                },
            }).then(() => {
                enqueueSnackbar('Projet créé avec succès', { variant: 'success' });
                formik.resetForm();
                props.handleClose();
            }).catch((error) => {
                enqueueSnackbar(error.message, { variant: 'error' });
            })
        },
    });
    const { errors, values, handleSubmit, getFieldProps } = formik;

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Créer un nouveau projet</DialogTitle>
                    <DialogContent>
                        <DialogContent>
                            Pour créer un nouveau projet remplir ce formulaire
                        </DialogContent>
                        <FormikProvider value={formik}>
                            <Form onSubmit={handleSubmit}>
                                <TextField
                                    autoComplete='nameProject'
                                    margin="dense"
                                    id="nameProject"
                                    label="Nom du projet"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...getFieldProps('nameProject')}
                                />
                                <TextField
                                    autoComplete='descriptionProject'
                                    autoFocus
                                    margin="dense"
                                    id="descriptionProject"
                                    label="Description du projet"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...getFieldProps('descriptionProject')}
                                />
                                <TextField
                                    autoComplete='clientProject'
                                    autoFocus
                                    margin="dense"
                                    id="clientProject"
                                    label="Client du projet"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    {...getFieldProps('clientProject')}
                                />
                            <DialogActions>
                                <Button onClick={props.handleClose}>Annuler</Button>
                                <Button type="submit" onClick={props.handleClose}>Créer</Button>
                            </DialogActions>
                        </Form>
                    </FormikProvider>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewProjectForm;