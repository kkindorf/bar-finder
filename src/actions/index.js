import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER,
    FIND_BARS,
    HANDLE_USER_SUBMISSION,
    HANDLE_REVIEW_REQUEST,
    CLEAR_SEARCH_RESULTS

} from './types';
const ROOT_URL = 'https://polar-garden-84556.herokuapp.com/';

export function signinUser({email, password}) {
    //redux thunk is allowing us to return a function from an action creator instead of an action object
    return function(dispatch) {
        //submit email/password to server
        //{ email: email, password: password }
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                //if request is good....
                //-update state to indicate user is authenticated
                dispatch({type: AUTH_USER});
                //-save the JWT token
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.id);
                //-redirect to the route '/feature'
                browserHistory.push('/');
            })
            .catch(() => {
            //If request is bad...
            //-Show an error to the user
            dispatch(authError('Bad login Info'))
            })
    }  
}

export function signupUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
        .then(response => {
            //if request is good....
            //-update state to indicate user is authenticated
            dispatch({type: AUTH_USER});
            //-save the JWT token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.id);
            //-redirect to the route '/feature'
            browserHistory.push('/');
        })
        .catch(e => dispatch(authError(e.response.data.error)));
            
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    browserHistory.push('/');
    return {type: UNAUTH_USER};
}

export function processSearchTerm(query) {
    return function(dispatch) {
       axios.get(`${ROOT_URL}/search/${query}`)
        .then(response => {
            dispatch({
                type: FIND_BARS,
                payload: response.data['data']
            })
        })
        
    }
}

export function handleUserSubmission(barAlias) {
    return function(dispatch) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token) {
            browserHistory.push('/signup');
        }
        else {
            axios.post(`${ROOT_URL}/handle-user/`, {barAlias, userId}, {
                headers: { authorization: token }})
                .then(response => {
                    dispatch({
                        type: HANDLE_USER_SUBMISSION,
                        payload: response.data['data']
                    })
            })
        }
    }
}

export function handleReviewRequest(barAlias) {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/grab-review/${barAlias}`)
            .then(response => {
                dispatch({
                    type: HANDLE_REVIEW_REQUEST,
                    payload: response.data
                })
            })
    }
}

export function clearBars() {
    return function(dispatch) {
        dispatch({ type: CLEAR_SEARCH_RESULTS})
    }
}