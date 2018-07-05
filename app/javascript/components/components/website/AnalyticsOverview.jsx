import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Website extends React.Component {

    render() {
        let todayHits = 0;
        _.map(this.props.analyticEntries.hour, (analyticEntry) => { 
            todayHits += analyticEntry.hits
        });

        let monthHits = 0;
        _.map(this.props.analyticEntries.day, (analyticEntry) => { 
            monthHits += analyticEntry.hits
        });

        let allTimeHits = 0;
        _.map(this.props.analyticEntries.year, (analyticEntry) => { 
            allTimeHits += analyticEntry.hits
        });

        return (
            <div>
                <Text type='body2'>Total page views: {allTimeHits}</Text>

                <Text type='body2'>Page views over last 24 hours: {todayHits}</Text>

                <Text type='body2'>Page views over last 31 days: {monthHits}</Text>
            </div>
        );
    }
}

Website.propTypes = {
    analyticEntries: PropTypes.object
};
