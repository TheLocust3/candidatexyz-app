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

const TIME_HIERARCHY = ['millisecond', 'second', 'minute', 'hour', 'date', 'month', 'year'];
export function normalizeTime(time, largest) {
    let lower = _.slice(TIME_HIERARCHY, 0, _.findIndex(TIME_HIERARCHY, (type) => { return type == largest }));
    let newTime = time;

    lower.map((timeType) => {
        if (timeType == 'month' || timeType == 'date') {
            newTime.set(timeType, 1);
        } else {
            newTime.set(timeType, 0);
        }
    });

    return newTime;
}

// data = [{ x: date, y: data }, ...]

export function condenseTimeSeries(data, by) {
    let processedData = [];

    data.map((datum) => {
        let index = _.findIndex(processedData, (processedDatum) => { return processedDatum.x.get(by) == datum.x.get(by) });
        if (index == -1) {
            processedData.push({ x: normalizeTime(datum.x, by), y: datum.y })
        } else {
            processedData[index] = { x: processedData[index].x, y: processedData[index].y + datum.y }
        }
    });

    return processedData;
}
