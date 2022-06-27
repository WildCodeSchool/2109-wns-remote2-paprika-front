import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type NewProjectFormProps = {
    handleClickOpen: () => void;
    handleClose: () => void;
    open: boolean;
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
                    <Button onClick={props.handleClose}>Créer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewProjectForm;