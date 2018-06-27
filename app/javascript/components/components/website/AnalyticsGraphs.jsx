import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from '../common/Text';
import TimeLineChart from '../common/graphs/TimeLineChart';

export default class AnalyticGraphs extends React.Component {

    render() {
        let hour = _.sortBy(this.props.analyticEntries.hour, (entry) => { return moment(entry.datetime).unix() });
        let day = _.sortBy(this.props.analyticEntries.day, (entry) => { return moment(entry.datetime).unix() });

        let hoursData = _.map(hour, (entry) => { return { x: entry.datetime, y: entry.hits } });
        let daysData = _.map(day, (entry) => { return { x: entry.datetime, y: entry.hits } });

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

AnalyticGraphs.propTypes = {
    analyticEntries: PropTypes.object
};
