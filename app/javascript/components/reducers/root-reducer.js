import { combineReducers } from 'redux';
import { userReducer, contactReducer, volunteerReducer, messageReducer, campaignReducer, analyticEntryReducer, receiptReducer, expenditureReducer, inKindReducer, liabilityReducer, reportReducer, committeeReducer } from 'candidatexyz-common-js';

import { globalReducer } from './global-reducer'

const reducer = combineReducers({
    users: userReducer,
    global: globalReducer,
    contacts: contactReducer,
    volunteers: volunteerReducer,
    messages: messageReducer,
    campaigns: campaignReducer,
    analyticEntries: analyticEntryReducer,
    receipts: receiptReducer,
    expenditures: expenditureReducer,
    inKinds: inKindReducer,
    liabilities: liabilityReducer,
    reports: reportReducer,
    committees: committeeReducer
});

export default reducer;
