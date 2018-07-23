import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Volunteer extends React.Component {

    renderAddress() {
        let volunteer = this.props.volunteer;
        if (_.isEmpty(volunteer.address) || _.isEmpty(volunteer.city)) return <div>N/A</div>;

        return (
            <div>
                {volunteer.address}, {volunteer.city}{_.isEmpty(volunteer.state) ? '' : `, ${volunteer.state}`}{_.isEmpty(volunteer.country) ? '' : `, ${volunteer.country}`}{_.isEmpty(volunteer.zipcode) ? '' : `, ${volunteer.zipcode}`}
            </div>
        );
    }

    render() {
        let volunteer = this.props.volunteer;

        return (
            <div>
                <Text type='body1'>Contact</Text>
                <Text type='body2'>Email: <a className='link' href={`mailto:${volunteer.email}`}>{volunteer.email}</a></Text>
                <Text type='body2'>Phone Number: {_.isEmpty(volunteer.phoneNumber) ? 'N/A' : volunteer.phoneNumber}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{this.renderAddress()}</Text>
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
