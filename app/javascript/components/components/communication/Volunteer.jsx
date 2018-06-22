import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

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
                <Text type='headline6'>Name</Text>
                <Text type='body1'>{this.renderName(volunteer)}</Text>
                <br />

                <Text type='headline6'>Email</Text>
                <Text type='body1'>{volunteer.email}</Text>
                <br />

                <Text type='headline6'>Address</Text>
                <Text type='body1'>{_.isEmpty(volunteer.address) ? 'N/A' : volunteer.address}</Text>
                <br />

                <Text type='headline6'>City</Text>
                <Text type='body1'>{_.isEmpty(volunteer.city) ? 'N/A' : volunteer.city}</Text>
                <br />

                <Text type='headline6'>State</Text>
                <Text type='body1'>{_.isEmpty(volunteer.state) ? 'N/A' : volunteer.state}</Text>
                <br />

                <Text type='headline6'>Zipcode</Text>
                <Text type='body1'>{_.isEmpty(volunteer.zipcode) ? 'N/A' : volunteer.zipcode}</Text>
                <br />

                <Text type='headline6'>Phone Number</Text>
                <Text type='body1'>{_.isEmpty(volunteer.phoneNumber) ? 'N/A' : volunteer.phoneNumber}</Text>
                <br />

                <Text type='headline6'>Help Type</Text>
                <Text type='body1'>{_.isEmpty(volunteer.helpType) ? 'N/A' : volunteer.helpType}</Text>
            </div>
        )
    }
}

Volunteer.propTypes = {
    volunteer: PropTypes.object
};
