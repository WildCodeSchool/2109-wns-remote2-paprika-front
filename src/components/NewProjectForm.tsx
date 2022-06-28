import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Project } from '../generated/graphql';
import { useFormik, Form, FormikProvider } from 'formik';
import * as yup from 'yup';

type NewProjectFormProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
    createNewProject: () => void;
    open: boolean;
}
const dataNewProject = (e: any) => {
    e.preventDefault();
    // props.createNewProject({
    //     projectInput: {
    //       name: 'test',
    //       description: 'description test',
    //       client: 'client test',
    //     }
    //   })
    console.log(e + "log e")
}

const validationSchema = yup.object({
    nameProject: yup
      .string()
      .required('Email is required'),
    taskProject: yup
      .string()
      .required('Password is required'),
    clientProject: yup
      .string()
      .required('Email is required'),
    participantProject: yup
      .string()
      .required('Password is required'),
  });
  
  const NewProjectForm = (props: NewProjectFormProps) => {
    const formik = useFormik({
        initialValues: {
            nameProject: '',
            taskProject: '',
            clientProject: '',
            participantProject: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            dataNewProject(props);
        },
    });
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

    console.log(formik.values.clientProject + "log formik")
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
                                autoFocus
                                margin="dense"
                                id="nameProject"
                                label="Nom du projet"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formik.values.nameProject}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="taskProject"
                                label="Task du projet"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formik.values.taskProject}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="clientProject"
                                label="Client du projet"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formik.values.clientProject}
                                onChange={formik.handleChange}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="participantProject"
                                label="Participants du projet"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={formik.values.participantProject}
                                onChange={formik.handleChange}
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