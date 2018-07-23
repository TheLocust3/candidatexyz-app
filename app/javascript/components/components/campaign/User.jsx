import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class User extends React.Component {

    renderName(user) {
        if (_.isEmpty(user.firstName) && _.isEmpty(user.lastName)) return 'N/A';

        return (
            <div>
                {user.firstName} {user.lastName}
            </div>
        )
    }

    renderAddress(user) {
        if (_.isEmpty(user.address) || _.isEmpty(user.city)) return <div>N/A</div>;

        return (
            <div>
                {user.address}, {user.city}{_.isEmpty(user.state) ? '' : `, ${user.state}`}{_.isEmpty(user.country) ? '' : `, ${user.country}`}{_.isEmpty(user.zipcode) ? '' : `, ${user.zipcode}`}
            </div>
        );
    }

    render() {
        let user = this.props.user;

        return (
            <div>
                <Text type='body1'>Contact Info</Text>
                <Text type='body2'>Email: <a className='link' href={`mailto:${user.email}`}>{user.email}</a></Text>
                <Text type='body2'>Phone Number: {_.isEmpty(user.phoneNumber) ? 'N/A' : user.phoneNumber}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{this.renderAddress(user)}</Text>
                <br />

                <Text type='body1'>Campaign Position</Text>
                <Text type='body2'>{_.isEmpty(user.position) ? 'None' : user.position}</Text>
                <br />

                <Text type='body1'>Party</Text>
                <Text type='body2'>{_.isEmpty(user.party) ? 'None' : user.party}</Text>
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.object
};
