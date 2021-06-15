import { combineReducers } from "redux";
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import resourceReducer from './resourceReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    resource: resourceReducer
});

export default rootReducer;