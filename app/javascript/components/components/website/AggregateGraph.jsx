import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import TimeLineChart from '../common/graphs/TimeLineChart';

export default class AggregateGraph extends React.Component {

    render() {
        let sortedEntries = _.sortBy(this.props.analyticEntries, (entry) => { return moment(entry.datetime).unix() });
        let analyticData = _.map(sortedEntries, (entry) => { return { x: entry.datetime, y: entry.hits } });

        return (
            <div>
                <TimeLineChart data={analyticData} label='Page Views' yAxis='Page Views' unit={this.props.unit} minX={this.props.start} maxX={this.props.end} />
            </div>
        );
    }
}

AggregateGraph.propTypes = {
    analyticEntries: PropTypes.array.isRequired,
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
    unit: PropTypes.string.isRequired
};
