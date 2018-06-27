import _ from 'lodash';

// Stolen from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
}

import mdcAutoInit from '@material/auto-init';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { MDCCheckbox } from '@material/checkbox';
import { MDCSelect } from '@material/select';
import { MDCTabBar } from '@material/tabs';

// TODO: Find better way to do this
export function autoInit() {
    mdcAutoInit.deregisterAll();

    mdcAutoInit.register('MDCRipple', MDCRipple);
    mdcAutoInit.register('MDCTextField', MDCTextField);
    mdcAutoInit.register('MDCCheckbox', MDCCheckbox);
    mdcAutoInit.register('MDCSelect', MDCSelect);
    mdcAutoInit.register('MDCTabBar', MDCTabBar);
    mdcAutoInit(document, () => { /* no messages */ });
}
