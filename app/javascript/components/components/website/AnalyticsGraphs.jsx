import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { condenseTimeSeries } from '../../../helpers';

import TimeLineChart from '../common/graphs/TimeLineChart';

export default class Website extends React.Component {

    dataFromEntries(entries) {
        return entries.map((entry) => {
            return { x: moment(entry.createdAt), y: 1 };
        });
    }

    render() {
        let today = _.filter(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(24, 'hours') });
        let month = _.filter(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(31, 'days') });
        let year = _.filter(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(12, 'months') });

        let hoursData = condenseTimeSeries(this.dataFromEntries(today), 'hour');
        let daysData = condenseTimeSeries(this.dataFromEntries(month), 'date');
        let monthsData = condenseTimeSeries(this.dataFromEntries(year), 'month');

        return (
            <div className='content'>
                <TimeLineChart data={hoursData} label='Page Views' yAxis='Page Views' unit='hour' />
                <br />

                <TimeLineChart data={daysData} label='Page Views' yAxis='Page Views' unit='day' />
                <br />

                <TimeLineChart data={monthsData} label='Page Views' yAxis='Page Views' unit='month' />
            </div>
        );
    }
}

Website.propTypes = {
    analyticEntries: PropTypes.array
};
