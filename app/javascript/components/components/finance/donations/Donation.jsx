import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Donation extends React.Component {

    renderEmail() {
        let receipt = this.props.receipt;
        if (_.isEmpty(receipt.email)) return 'N/A';

        return (
            <a className='link' href={`mailto:${receipt.email}`}>{receipt.email}</a>
        );
    }

    renderDonationFields() {
        let receipt = this.props.receipt;
        if (receipt.receiptType != 'donation') return;

        return (
            <div>
                <Text type='body1'>Contact</Text>
                <Text type='body2'>Email: {this.renderEmail()}</Text>
                <Text type='body2'>Phone Number: {_.isEmpty(receipt.phoneNumber) ? 'N/A' : receipt.phoneNumber}</Text>

                <br />
            </div>
        );
    }

    renderOccupation() {
        let receipt = this.props.receipt;
        if (_.isEmpty(receipt.occupation) || _.isEmpty(receipt.employer)) return 'N/A';

        return `${receipt.occupation} at ${receipt.employer}`;
    }

    render() {
        let receipt = this.props.receipt;

        return (
            <div>
                <Text type='body1'>Amount</Text>
                <Text type='body2'>{receipt.amountString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{receipt.address}, {receipt.city}, {receipt.state}{_.isEmpty(receipt.country) ? '' : `, ${receipt.country}`}</Text>
                <br />

                {this.renderDonationFields()}

                <Text type='body1'>Occupation</Text>
                <Text type='body2'>{this.renderOccupation()}</Text>
                <br />

                <Text type='body1'>Date Received</Text>
                <Text type='body2'>{moment(receipt.dateReceived).format('MM/DD/YYYY')}</Text>
            </div>
        )
    }
}

Donation.propTypes = {
    receipt: PropTypes.object
};
