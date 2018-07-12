import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Liability extends React.Component {

    render() {
        let liability = this.props.liability;

        return (
            <div>
                <Text type='body1'>To Whom</Text>
                <Text type='body2'>{liability.toWhom}</Text>
                <br />

                <Text type='body1'>Purpose</Text>
                <Text type='body2'>{liability.purpose}</Text>
                <br />

                <Text type='body1'>Amount</Text>
                <Text type='body2'>{liability.amountString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{liability.address}, {liability.city}, {liability.state}, {liability.country}</Text>
                <br />

                <Text type='body1'>Date Incurred</Text>
                <Text type='body2'>{moment(liability.datePaid).format('MM/DD/YYYY')}</Text>
            </div>
        )
    }
}

Liability.propTypes = {
    liability: PropTypes.object
};
