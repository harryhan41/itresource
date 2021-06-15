import * as actionTypes from '../action/actionTypes';
// import {updateObject} from '../utility'

const initialState = [];

const getAllProjects = (state, action) => {
    state = action.payload;
    console.log('action payload');
    console.log(action.payload);
    return state;
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_PROJECTS : return getAllProjects(state, action);
        default:
            return state;
    }
}

export default reducer;