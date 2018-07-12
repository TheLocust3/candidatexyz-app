import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Expenditure extends React.Component {

    render() {
        let expenditure = this.props.expenditure;

        return (
            <div>
                <Text type='body1'>Paid To</Text>
                <Text type='body2'>{expenditure.paidTo}</Text>
                <br />

                <Text type='body1'>Purpose</Text>
                <Text type='body2'>{expenditure.purpose}</Text>
                <br />

                <Text type='body1'>Amount</Text>
                <Text type='body2'>{expenditure.amountString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{expenditure.address}, {expenditure.city}, {expenditure.state}, {expenditure.country}</Text>
                <br />

                <Text type='body1'>Date Paid</Text>
                <Text type='body2'>{moment(expenditure.datePaid).format('MM/DD/YYYY')}</Text>
            </div>
        )
    }
}

Expenditure.propTypes = {
    expenditure: PropTypes.object
};
