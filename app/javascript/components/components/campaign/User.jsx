import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

export default class User extends React.Component {

    renderName(user) {
        if (_.isEmpty(user.firstName) && _.isEmpty(user.lastName)) return 'N/A';

        return (
            <div>
                {user.firstName} {user.lastName}
            </div>
        )
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

                <Text type='body1'>Admin?</Text>
                <Text type='body2'>{this.props.user.admin ? 'Yes' : 'No'}</Text>
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.object
};
