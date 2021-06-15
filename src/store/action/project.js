import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getAll = (data) => {
    return {
        type: actionTypes.GET_ALL_PROJECTS,
        payload: data
    }
}

export const getAllProjects = () => {
    return (dispatch) => {
        let url = '/project';
        axios.get(url)
            .then(response => {
                console.log('response is below')
                console.log(response.data);
                dispatch(getAll(response.data))
            })
    }
}