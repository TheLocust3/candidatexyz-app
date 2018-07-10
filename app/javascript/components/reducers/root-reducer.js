import { combineReducers } from 'redux';
import { userReducer, contactReducer, volunteerReducer, messageReducer, campaignReducer, analyticEntryReducer, donorReducer } from 'candidatexyz-common-js';

import { globalReducer } from './global-reducer'

const reducer = combineReducers({
    users: userReducer,
    global: globalReducer,
    contacts: contactReducer,
    volunteers: volunteerReducer,
    messages: messageReducer,
    campaigns: campaignReducer,
    analyticEntries: analyticEntryReducer,
    donors: donorReducer
});

export default reducer;
