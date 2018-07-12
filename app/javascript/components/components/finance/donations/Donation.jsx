import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Donation extends React.Component {

    renderDonationFields() {
        let receipt = this.props.receipt;
        if (receipt.receiptType != 'donation') return;

        return (
            <div>
                <Text type='body1'>Email</Text>
                <Text type='body2'>{_.isEmpty(receipt.email) ? 'N/A' : receipt.email}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(receipt.phoneNumber) ? 'N/A' : receipt.phoneNumber}</Text>
                <br />
            </div>
        );
    }

    render() {
        let receipt = this.props.receipt;

        return (
            <div>
                <Text type='body1'>Donor</Text>
                <Text type='body2'><Link className='link' to={`/finance/donors/${receipt.id}`}>{receipt.name}</Link></Text>
                <br />

                <Text type='body1'>Amount</Text>
                <Text type='body2'>{receipt.amountString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{receipt.address}, {receipt.city}, {receipt.state}, {receipt.country}</Text>
                <br />

                {this.renderDonationFields()}

                <Text type='body1'>Occupation</Text>
                <Text type='body2'>{_.isEmpty(receipt.occupation) ? 'N/A' : receipt.occupation}</Text>
                <br />

                <Text type='body1'>Employer</Text>
                <Text type='body2'>{_.isEmpty(receipt.employer) ? 'N/A' : receipt.employer}</Text>
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
