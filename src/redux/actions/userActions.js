import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER, SET_UNAUTHENTICATED, MARK_NOTIFICAITONS_READ } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
    .then(res => {
        console.log(res.data);
        satAuthorizationHeader(res.data.token);
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS});
        history.push('/home');
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

export const loginUserNavbar = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
    .then(res => {
        console.log(res.data);
        satAuthorizationHeader(res.data.token);
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS});
        window.location.replace('/home');
    })
    .catch((err) => {
        console.log(err);
        window.history.pushState(null, null, '/login')
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
        
    });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED })
    document.location.href = '/'
}

export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
            })
            .catch(err => {
                console.log(err)
        })
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
    .then(res => {
        console.log(res.data);
        satAuthorizationHeader(res.data.token);
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS});
        history.push('/');
    })
    .catch((err) => {
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER })
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData());
        })
        .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER})
    axios.post('/user', userDetails)
        .then(() => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err));
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios.post('/notifications', notificationIds)
        .then((res) => {
            dispatch({
                type: MARK_NOTIFICAITONS_READ
            })
        })
        .catch((err) => {
            console.error(err);
        })
}

const satAuthorizationHeader = (token) => {
    localStorage.setItem('FBToken', `Bearer ${token}`);
    const FBToken = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = FBToken
};

