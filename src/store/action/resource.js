import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getAll = (data) => {
    return {
        type: actionTypes.GET_ALL_RESOURCES,
        payload: data
    }
}

export const getAllResources = () => {
    return (dispatch) => {
        let url = '/resource';
        axios.get(url)
            .then(response => {
                console.log('response is below')
                console.log(response.data);
                dispatch(getAll(response.data))
            })
    }
}

export const searchResource = (data) => {
    console.log(data);
    return {
        type: actionTypes.SEARCH_RESOURCES,
        payload: data
    }
}