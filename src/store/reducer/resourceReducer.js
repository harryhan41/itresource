import * as actionTypes from '../action/actionTypes';
// import {updateObject} from '../utility'

const initialState = [];

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.GET_ALL_RESOURCES: return action.payload;
        case actionTypes.SEARCH_RESOURCES: return action.payload;
        default:
            return state;
    }
}

export default reducer;