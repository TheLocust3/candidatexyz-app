import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

import AggregateGraph from './AggregateGraph';

export default class AnalyticGraphs extends React.Component {

    render() {
        let dayStart = moment().minute(0).second(0).millisecond(0).subtract(24, 'hours');
        let dayEnd = moment().minute(0).second(0).millisecond(0);
        let monthStart = moment().hour(0).minute(0).second(0).millisecond(0).subtract(31, 'days');
        let monthEnd = moment().hour(0).minute(0).second(0).millisecond(0);

        return (
            <div>
                <Text type='headline6'>Past 24 Hours</Text>
                <Text type='body2'>Page views per hour</Text><br />

                <AggregateGraph analyticEntries={this.props.analyticEntries.hour} start={dayStart} end={dayEnd} unit='hour' />
                <br /><br />

                <Text type='headline6'>Past 31 Days</Text>
                <Text type='body2'>Page views per day</Text><br />

                <AggregateGraph analyticEntries={this.props.analyticEntries.day} start={monthStart} end={monthEnd} unit='day' />
            </div>
        );
    }
}

AnalyticGraphs.propTypes = {
    analyticEntries: PropTypes.object
};
