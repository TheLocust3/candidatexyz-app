import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Donor extends React.Component {

    renderDonationFields() {
        let donor = this.props.donor;
        if (donor.receiptType != 'donation') return;

        return (
            <div>
                <Text type='body1'>Email</Text>
                <Text type='body2'>{_.isEmpty(donor.email) ? 'N/A' : donor.email}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(donor.phoneNumber) ? 'N/A' : donor.phoneNumber}</Text>
                <br />
            </div>
        );
    }

    render() {
        let donor = this.props.donor;

        return (
            <div>
                <Text type='body1'>Donor</Text>
                <Text type='body2'>{donor.name}</Text>
                <br />

                <Text type='body1'>Total Amount</Text>
                <Text type='body2'>${donor.amount}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{donor.address}, {donor.city}, {donor.state}</Text>
                <br />

                {this.renderDonationFields()}

                <Text type='body1'>Occupation</Text>
                <Text type='body2'>{_.isEmpty(donor.occupation) ? 'N/A' : donor.occupation}</Text>
                <br />

                <Text type='body1'>Employer</Text>
                <Text type='body2'>{_.isEmpty(donor.employer) ? 'N/A' : donor.employer}</Text>
            </div>
        )
    }
}

Donor.propTypes = {
    donor: PropTypes.object
};
