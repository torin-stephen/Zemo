import { myFirebase } from "../firebase/firebase";
import firebase from "firebase/app";
import "firebase/auth";


var provider = new firebase.auth.GoogleAuthProvider();

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

const requestLogin = () => {
return {
    type: LOGIN_REQUEST
};
};

const receiveLogin = user => {
return {
    type: LOGIN_SUCCESS,
    user
};
};

const loginError = () => {
return {
    type: LOGIN_FAILURE
};
};

const requestLogout = () => {
return {
    type: LOGOUT_REQUEST
};
};

const receiveLogout = () => {
return {
    type: LOGOUT_SUCCESS
};
};

const logoutError = () => {
return {
    type: LOGOUT_FAILURE
};
};


export const googleLoginUser = () => dispatch => {
    dispatch(requestLogin());
    myFirebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        dispatch(receiveLogin(result));
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(loginError());
      });
  };

export const googleLogoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
    .catch(error => {
    //Do something with the error if you want!
    dispatch(logoutError());
    });
};
