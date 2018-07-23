import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Donor extends React.Component {

    renderEmail() {
        let donor = this.props.donor;
        if (_.isEmpty(donor.email)) return 'N/A';

        return (
            <a className='link' href={`mailto:${donor.email}`}>{donor.email}</a>
        );
    }

    renderDonationFields() {
        let donor = this.props.donor;
        if (donor.receiptType != 'donation') return;

        return (
            <div>
                <Text type='body1'>Contact</Text>
                <Text type='body2'>Email: {this.renderEmail()}</Text>
                <Text type='body2'>Phone Number: {_.isEmpty(donor.phoneNumber) ? 'N/A' : recedonoript.phoneNumber}</Text>
            </div>
        );
    }

    renderOccupation() {
        let donor = this.props.donor;
        if (_.isEmpty(donor.occupation) || _.isEmpty(donor.employer)) return 'N/A';

        return `${donor.occupation} at ${donor.employer}`;
    }

    render() {
        let donor = this.props.donor;

        return (
            <div>
                <Text type='body1'>Total Amount</Text>
                <Text type='body2'>${donor.amount}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{donor.address}, {donor.city}, {donor.state}{_.isEmpty(donor.country) ? '' : `, ${donor.country}`}</Text>
                <br />

                {this.renderDonationFields()}
            </div>
        )
    }
}

Donor.propTypes = {
    donor: PropTypes.object
};
