import { combineReducers } from 'redux';
import { userReducer, contactReducer, volunteerReducer, messageReducer } from 'candidatexyz-common-js';

import { globalReducer } from './global-reducer'

const reducer = combineReducers({
    users: userReducer,
    global: globalReducer,
    contacts: contactReducer,
    volunteers: volunteerReducer,
    messages: messageReducer
});

export default reducer;
