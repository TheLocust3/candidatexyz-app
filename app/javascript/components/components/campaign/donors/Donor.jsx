import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Donor extends React.Component {

    render() {
        let donor = this.props.donor;

        return (
            <div>
                <Text type='body1'>Donor</Text>
                <Text type='body2'>{donor.name}</Text>
                <br />

                <Text type='body1'>Amount</Text>
                <Text type='body2'>${donor.amount}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{donor.address}, {donor.city}, {donor.state}</Text>
                <br />

                <Text type='body1'>Occupation</Text>
                <Text type='body2'>{_.isEmpty(donor.occupation) ? 'N/A' : donor.occupation}</Text>
                <br />

                <Text type='body1'>Employer</Text>
                <Text type='body2'>{_.isEmpty(donor.employer) ? 'N/A' : donor.employer}</Text>
                <br />

                <Text type='body1'>Date Received</Text>
                <Text type='body2'>{donor.dateReceived}</Text>
            </div>
        )
    }
}

Donor.propTypes = {
    donor: PropTypes.object
};
