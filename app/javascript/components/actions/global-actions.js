import _ from 'lodash';

export const SET_TITLE = 'SET_TITLE';
export const SET_BREADCRUMB = 'SET_BREADCRUMB';
export const SET_DRAWER_SELECTED = 'SET_DRAWER_SELECTED';
export const SET_DRAWER_DISABLED = 'SET_DRAWER_DISABLED';

export function setTitle(title) {
    return {
        type: SET_TITLE,
        data: title
    }
}

export function setBreadcrumb(breadcrumb) {
    return {
        type: SET_BREADCRUMB,
        data: breadcrumb
    }
}

export function setDrawerSelected(item, subItem) {
    subItem = _.isEmpty(subItem) ? '' : subItem;

    return {
        type: SET_DRAWER_SELECTED,
        data: { item: item, subItem: subItem }
    }
}

export function setDrawerDisabled(disabled) {
    return {
        type: SET_DRAWER_DISABLED,
        data: disabled
    }
}
