import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Project } from '../generated/graphql';

type NewProjectFormProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
    createNewProject: () => void;
    open: boolean;
}
const dataNewProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    // const description = e.currentTarget.description.value;
    // const startAt = e.currentTarget.startAt.value;
    // const client = e.currentTarget.client.value;
    // const participant = e.currentTarget.participant.value;
    // const task = e.currentTarget.task.value;
    // const project = {
    //     name,
    //     description,
    //     startAt,
    //     client,
    //     participant,
    //     task
    // }
    console.log(name);
}


const NewProjectForm = (props : NewProjectFormProps) => {
    return (
        <div>
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
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="taskProject"
                        label="Task du projet"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="clientProject"
                        label="Client du projet"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="participantProject"
                        label="Participants du projet"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Annuler</Button>
                    <Button type="submit" onSubmit={() => dataNewProject} onClick={props.createNewProject}>Créer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewProjectForm;