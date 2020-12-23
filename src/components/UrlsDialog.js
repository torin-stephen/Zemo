import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

export default function UrlsDialog(props) {

    return (
        <Dialog open={props.state.formopen} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Zemo</DialogTitle>
            <DialogContent>
                {props.state.ytlink.length === 0 && props.state.iglink.length === 0 && props.state.twlink.length === 0 && 
                    (
                        <DialogContentText>
                            Enter URLs.
                        </DialogContentText>
                    )
                }
                <TextField
                    autoFocus
                    margin="dense"
                    id="youtubelink"
                    label="Youtube Link"
                    type="url"
                    fullWidth
                    value={props.state.ytlink}
                    onChange={props.handleYtLinkChange}
                />
                <TextField
                    margin="dense"
                    id="instagramlink"
                    label="Instagram Link"
                    type="url"
                    fullWidth
                    value={props.state.iglink}
                    onChange={props.handleIgLinkChange}
                />
                <TextField
                    margin="dense"
                    id="twitterlink"
                    label="Twitter Link"
                    type="url"
                    fullWidth
                    value={props.state.twlink}
                    onChange={props.handleTwLinkChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
              </Button>
                <Button onClick={props.handleSubmit} color="primary">
                    Create
              </Button>
            </DialogActions>
        </Dialog>
    );
}