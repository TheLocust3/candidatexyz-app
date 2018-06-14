import * as GlobalActions from '../actions/global-actions';
import { TITLE } from '../../constants';

const initialState = {
    title: ''
};

export function globalReducer(state = initialState, action) {
    switch (action.type) {
        case GlobalActions.SET_TITLE:
            document.title = `${TITLE} - ${action.data}`

            return Object.assign({}, state, {
                title: action.data
            });
        default:
            return state;
    }
}
