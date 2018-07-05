import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Volunteer extends React.Component {

    renderName(volunteer) {
        if (_.isEmpty(volunteer.firstName) && _.isEmpty(volunteer.lastName)) return 'N/A';

        return (
            <div>
                {volunteer.firstName} {volunteer.lastName}
            </div>
        )
    }

    render() {
        let volunteer = this.props.volunteer;

        return (
            <div>
                <Text type='body1'>Name</Text>
                <Text type='body2'>{this.renderName(volunteer)}</Text>
                <br />

                <Text type='body1'>Email</Text>
                <Text type='body2'>{volunteer.email}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{_.isEmpty(volunteer.address) ? 'N/A' : volunteer.address}</Text>
                <br />

                <Text type='body1'>City</Text>
                <Text type='body2'>{_.isEmpty(volunteer.city) ? 'N/A' : volunteer.city}</Text>
                <br />

                <Text type='body1'>State</Text>
                <Text type='body2'>{_.isEmpty(volunteer.state) ? 'N/A' : volunteer.state}</Text>
                <br />

                <Text type='body1'>Zipcode</Text>
                <Text type='body2'>{_.isEmpty(volunteer.zipcode) ? 'N/A' : volunteer.zipcode}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(volunteer.phoneNumber) ? 'N/A' : volunteer.phoneNumber}</Text>
                <br />

                <Text type='body1'>Help Type</Text>
                <Text type='body2'>{_.isEmpty(volunteer.helpBlurb) ? 'N/A' : volunteer.helpBlurb}</Text>
            </div>
        )
    }
}

Volunteer.propTypes = {
    volunteer: PropTypes.object
};
