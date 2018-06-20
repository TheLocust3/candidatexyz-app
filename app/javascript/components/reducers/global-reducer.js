import * as GlobalActions from '../actions/global-actions';
import { TITLE } from '../../constants';

const initialState = {
    title: '',
    breadcrumb: '',
    drawerSelected: { item: 'Home', subItem: '' }
};

export function globalReducer(state = initialState, action) {
    switch (action.type) {
        case GlobalActions.SET_TITLE:
            document.title = `${TITLE} - ${action.data}`

            return Object.assign({}, state, {
                title: action.data
            });
        case GlobalActions.SET_BREADCRUMB:
            return Object.assign({}, state, {
                breadcrumb: action.data
            });
        case GlobalActions.SET_DRAWER_SELECTED:
            return Object.assign({}, state, {
                drawerSelected: action.data
            });
        default:
            return state;
    }
}
