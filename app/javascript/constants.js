import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configure } from 'candidatexyz-common-js';

import reducer from './components/reducers/root-reducer';

import { createBrowserHistory } from 'history';

export let history = createBrowserHistory();
export const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export const MAX_MOBILE_WIDTH = 768;
export const TITLE = 'candidateXYZ';

export const DEVELOPMENT_ENVIRONMENT = true;
export const DOMAIN = DEVELOPMENT_ENVIRONMENT ? 'http://127.0.0.1:3000' : 'https://candidatexyz.com';

configure({ developmentRoutes: DEVELOPMENT_ENVIRONMENT });