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
        if (_.isEmpty(user.address) || _.isEmpty(user.city) || _.isEmpty(user.state) || _.isEmpty(user.country) || _.isEmpty(user.zipcode)) {
            return (
                <div>
                    N/A
                </div>
            );
        }

        return (
            <div>
                {user.address}, {user.city}, {user.state}, {user.country}, {user.zipcode}
            </div>
        );
    }

    render() {
        let user = this.props.user;

        return (
            <div>
                <Text type='body1'>Name</Text>
                <Text type='body2'>{this.renderName(user)}</Text>
                <br />

                <Text type='body1'>Email</Text>
                <Text type='body2'>{user.email}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(user.phoneNumber) ? 'N/A' : user.phoneNumber}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{this.renderAddress(user)}</Text>
                <br />

                <Text type='body1'>Campaign Position</Text>
                <Text type='body2'>{_.isEmpty(user.position) ? 'None' : user.position}</Text>
                <br />

                <Text type='body1'>Party</Text>
                <Text type='body2'>{_.isEmpty(user.party) ? 'None' : user.party}</Text>
                <br />

                <Text type='body1'>Admin?</Text>
                <Text type='body2'>{user.admin ? 'Yes' : 'No'}</Text>
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.object
};
