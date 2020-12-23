import React, { Component } from 'react';
import CardUrls from "./CardUrls.js";
import UrlsDialog from "./UrlsDialog.js";
import Footer from "./Footer.js";



import { connect } from "react-redux";
import { googleLogoutUser } from "../actions";
import { myFirebase, db } from '../firebase/firebase';

import {  AppBar, Button, Container, CssBaseline,
          Fab, LinearProgress, Snackbar, Toolbar, Typography 
        } from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
});

class Admin extends Component {
  constructor() {
    super()
		this.state = {
			user: null,
      loading: true,
      links: [],
      formopen: false,
      ytlink: "",
      iglink: "",
      twlink: "",
      curl: "",
      successToast: false,
      viewMode: "module",
    }
    this.handleYtLinkChange = this.handleYtLinkChange.bind(this);
    this.handleIgLinkChange = this.handleIgLinkChange.bind(this);
    this.handleTwLinkChange = this.handleTwLinkChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  
  handleYtLinkChange = (event) => {
    this.setState({ytlink: event.target.value});
  }

  handleIgLinkChange = (event) => {
    this.setState({iglink: event.target.value});
  }

  handleTwLinkChange = (event) => {
    this.setState({twlink: event.target.value});
  }

  handlePfpChange = (event) => {
    this.setState({photoURL: event.target.value});
  }

  handleSubmit = async (event) => {
    var ytlink = this.state.ytlink;
    var iglink = this.state.iglink;
    var twlink = this.state.twlink;
    var curl = this.state.user.uid.substring(0, 5);
    const self = this;

    let data = {
      ytlink: ytlink,
      iglink: iglink,
      twlink: twlink,
      curl: this.state.user.uid.substring(0, 5),
      photoURL: this.state.user.photoURL,
      name: this.state.user.displayName,
    };
    
    db.collection('links').doc(curl).set(data).then(function(){
      self.setState({ successToast: true});
    });

    self.handleClose();
    self.updateUrls();
    
    event.preventDefault();
  }

  handleEditLinks = (curl) => {
    const self = this;
    var docref = db.collection('links').doc(this.state.user.uid.substring(0, 5));
    docref.get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        var data = doc.data();

        self.setState({ytlink: data.ytlink});
        self.setState({iglink: data.iglink});
        self.setState({twlink: data.twlink});
        self.setState({curl: data.curl});
        self.setState({formopen: true});
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

  handleClickOpen = () => {
    this.setState({ formopen: true});
    this.setState({ytlink: ""});
    this.setState({iglink: ""});
    this.setState({twlink: ""});
    this.setState({curl: ""});
    this.setState({photoURL: ""});
  };

  handleClose = () => {
    this.setState({ formopen: false})
  };

  handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ successToast: false})
  };

  updateUrls = () => {
    const self = this;
    self.setState({ loading: true });
    self.setState({ links: []});

    db.collection('links').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var data = doc.data();
        if (data.curl === this.state.user.uid.substring(0, 5)) {
          self.setState({links: [...self.state.links, {"id": doc.id, "data": doc.data()}]});
        }
      });
      self.setState({ loading: false });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
      self.setState({ loading: false });
    });
  }

  updateViewMode = (mode) => {
    this.setState({viewMode: mode});
    db.collection('settings').doc("viewMode").set({value: mode});
  }

  componentDidMount() {
    const self = this;
		myFirebase.auth().onAuthStateChanged(function(user) {
			if (user) {
        self.setState({ user });
        self.updateUrls();
        var viewModeRef = db.collection('settings').doc("viewMode");
        viewModeRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No viewMode set!');
            } else {
              var data = doc.data();
              self.setState({viewMode: data.value})
            }
          })
          .catch(err => {
            console.log('Error getting viewMode', err);
          });
			} else {
				self.setState({ user: null });
      }
		});
  };
  
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(googleLogoutUser());
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Zemo
              </Typography>
              <Button color="inherit" onClick={this.handleLogout} >Logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        {this.state.loading &&
          (
            <LinearProgress color="secondary" />
          )
        }
        <main>
          {this.state.links.length > 0 ?
            (
              <>
                { this.state.viewMode === "module" ? (
                  <CardUrls 
                    links = {this.state.links}
                    handleEditLinks = {this.handleEditLinks}
                    handleDeletelinks = {this.handleDeletelinks}
                  />
                ): (
                  <>
                  </>
                )}
              </>
            )
            :
            (
              <div className={classes.heroContent}>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    <br></br>
                    <br></br>
                    Oops! Nothing here.
                  </Typography>
                </Container>
              </div>
            )
          }

          <Fab aria-label="Add" className={classes.fab} color="primary" onClick={this.handleClickOpen}>
            <AddIcon />
          </Fab>

          <UrlsDialog 
            state={this.state} 
            handleClose = {this.handleClose}
            handleYtLinkChange = {this.handleYtLinkChange}
            handleIgLinkChange = {this.handleIgLinkChange}
            handleTwLinkChange = {this.handleTwLinkChange}
            handleCurlChange = {this.handleCurlChange}
            handlePfpChange = {this.handlePfpChange}
            handleSubmit = {this.handleSubmit}
          />
          
          <Snackbar open={this.state.successToast} autoHideDuration={6000} onClose={this.handleToastClose}>
            <Alert onClose={this.handleToastClose} severity="success">
              Successfully added!
            </Alert>
          </Snackbar>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Admin));