import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Text from '../common/Text';

export default class Website extends React.Component {

    render() {
        let today = _.filter(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(24, 'hours') });
        let month = _.filter(this.props.analyticEntries, (analyticEntry) => { return moment(analyticEntry.createdAt) > moment().subtract(31, 'days') });

        return (
            <div className='content'>
                <Text type='body2'>Total site views: {this.props.analyticEntries.length}</Text>

                <Text type='body2'>Site views over last 24 hours: {today.length}</Text>

                <Text type='body2'>Site views over last 31 days: {month.length}</Text>
            </div>
        );
    }
}

Website.propTypes = {
    analyticEntries: PropTypes.array
};
