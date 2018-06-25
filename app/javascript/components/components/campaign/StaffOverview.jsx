import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Text from '../common/Text';

export default class StaffOverview extends React.Component {

    renderNumberOfUsers() {
        if (this.props.users.length == 1) {
            return '1 Staff Member'
        } else {
            return `${this.props.users.length} Staff Members`
        }
    }

    renderAdmins() {
        return (
            <Text type='body2'>
                {_.join(this.props.users.map((user) => {
                    if (user.admin) {
                        return `${user.firstName} ${user.lastName}`;
                    }
                }), ', ')}
            </Text>
        )
    }

    render() {
        return (
            <div>
                <Link className='link' to='/campaign/staff'>
                    <Text type='body2'>{this.renderNumberOfUsers()}</Text>
                </Link>

                <br /><br />

                <Text type='body1'>Administrators</Text>
                {this.renderAdmins()}
            </div>
        )
    }
}

StaffOverview.propTypes = {
    users: PropTypes.array
};
