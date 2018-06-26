import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { condenseTimeSeries } from '../../../helpers';

import Text from '../common/Text';
import TimeLineChart from '../common/graphs/TimeLineChart';

export default class Website extends React.Component {

    dataFromEntries(entries) {
        return entries.map((entry) => {
            return { x: moment(entry.createdAt), y: 1 };
        });
    }

    render() {
        let entries = _.sortBy(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt).unix() });

        let today = _.filter(entries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(24, 'hours') });
        let month = _.filter(entries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(31, 'days') });

        let hoursData = condenseTimeSeries(this.dataFromEntries(today), 'hour');
        let daysData = condenseTimeSeries(this.dataFromEntries(month), 'date');

        let dayStart = moment().minute(0).second(0).millisecond(0).subtract(24, 'hours');
        let dayEnd = moment().minute(0).second(0).millisecond(0);
        let monthStart = moment().hour(0).minute(0).second(0).millisecond(0).subtract(31, 'days');
        let monthEnd = moment().hour(0).minute(0).second(0).millisecond(0);

        return (
            <div>
                <Text type='headline6'>Past 24 Hours</Text>
                <Text type='body2'>Page views per hour</Text><br />

                <TimeLineChart data={hoursData} label='Page Views' yAxis='Page Views' unit='hour' minX={dayStart} maxX={dayEnd} />
                <br /><br />

                <Text type='headline6'>Past 31 Days</Text>
                <Text type='body2'>Page views per day</Text><br />

                <TimeLineChart data={daysData} label='Page Views' yAxis='Page Views' unit='day' minX={monthStart} maxX={monthEnd} />
            </div>
        );
    }
}

Website.propTypes = {
    analyticEntries: PropTypes.array
};
