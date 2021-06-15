import axios from 'axios';
import jwt_decode from "jwt-decode";

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    console.log('logging out');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, callback) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: email,
            password: password
            // returnSecureToken: true
        };
        let url = '/authenticate';
        console.log('auth data ' + authData.name + ' ' + authData.password);
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                console.log(response.status);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('expirationDate', expirationDate);
                // console.log(jwt_decode(localStorage.token));
                // localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.jwt, null));
                // dispatch(checkAuthTimeout(100));
                callback();
            })
            .catch(err => {
                console.log('this is error')
                console.log(err.response)
                // console.log("error token");
                // console.log(localStorage.getItem('token'));
                // console.log(err.response.data.status)
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};