import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class StaffOverview extends React.Component {

    renderNumberOfUsers() {
        if (this.props.users.length == 1) {
            return '1 Staff Member'
        } else {
            return `${this.props.users.length} Staff Members`
        }
    }

    renderAdmins() {
        let admins = this.props.users.filter((user) => { return user.admin });
        if (_.isEmpty(admins)) {
            return (
                <Text type='body2'>
                    None
                </Text>
            )
        }

        return (
            <Text type='body2'>
                {_.join(admins.map((user) => {
                    if (user.admin) {
                        return `${user.firstName} ${user.lastName}`;
                    }
                }), ', ')}
            </Text>
        )
    }

    renderOfficers() {
        return (
            <div>
                {_.filter(this.props.users, (user) => { return !_.isEmpty(user.position) }).map((user) => {
                    return (
                        <Text key={user.id} type='body2'>
                            {user.position}: {user.firstName} {user.lastName}
                        </Text>
                    )
                })}
            </div>
        )
    }

    renderNonSmall() {
        if (this.props.small) return;

        return (
            <div style={{ marginTop: '3%' }}>
                <Text type='body1'>Administrators</Text>
                {this.renderAdmins()}
                <br />

                <Text type='body1'>Committee Officers</Text>
                {this.renderOfficers()}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Link className='link' to='/campaign/staff'>
                    <Text type='body2'>{this.renderNumberOfUsers()}</Text>
                </Link>

                <br />
                {this.renderNonSmall()}
            </div>
        )
    }
}

StaffOverview.propTypes = {
    users: PropTypes.array,
    small: PropTypes.bool
};
