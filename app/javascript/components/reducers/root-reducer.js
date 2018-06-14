import { combineReducers } from 'redux';

import { userReducer } from './user-reducer'
import { globalReducer } from './global-reducer'

const reducer = combineReducers({
    users: userReducer,
    global: globalReducer
});

export default reducer;
