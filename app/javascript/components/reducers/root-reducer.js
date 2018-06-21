import { combineReducers } from 'redux';
import { userReducer } from 'candidatexyz-common-js';

import { globalReducer } from './global-reducer'

const reducer = combineReducers({
    users: userReducer,
    global: globalReducer
});

export default reducer;
