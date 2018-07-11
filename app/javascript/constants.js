import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk/es';
import { configure } from 'candidatexyz-common-js';
import { createBrowserHistory } from 'history/es';

import reducer from './components/reducers/root-reducer';
import { DEVELOPMENT_ENVIRONMENT } from './features';

export let history = createBrowserHistory();
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export const MAX_MOBILE_WIDTH = 768;
export const TITLE = 'candidateXYZ';

export const STATES = [ 'AL', 'AK', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'AS', 'DC', 'FM', 'GU', 'MH', 'MP', 'PW', 'PR', 'VI' ];

export const PURPLE_PRIMARY = { red: 71, green: 10, blue: 102 };
export const PURPLE_LIGHT = { red: 142, green: 18, blue: 204 };

export const DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3000' : 'https://candidatexyz.com';

configure({ developmentRoutes: DEVELOPMENT_ENVIRONMENT });
