import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Link from '@mui/material/Link'

export default function FormDialog() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Link variant="body2" onClick={handleClickOpen}>
                Forgot password?
            </Link>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Forgot your password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the Email Address associated with your Paprika
                        account. We will send you a temporary password to this
                        100% secure address.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
