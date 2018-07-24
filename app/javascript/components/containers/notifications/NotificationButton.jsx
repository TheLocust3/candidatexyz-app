import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NotificationActions } from 'candidatexyz-common-js';

class NotificationButton extends React.Component {

    componentWillMount() {
        this.props.dispatch(NotificationActions.fetchAllNotifications())
    }

    renderNotificationIcon() {
        if (_.filter(this.props.notifications.notifications, (notification) => { return !notification.read }).length != 0) {
            return <i className='material-icons'>notification_important</i>;
        } else {
            return <i className='material-icons'>notifications_none</i>;
        }
    }

    render() {
        return (
            <div className='notification-button-wrapper'>
                <div className='middle'>
                    <Link className='unstyled-link unstyled-link-black' to={this.props.drawerDisabled ? '#' : '/notifications'}>
                        {this.renderNotificationIcon()}
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.notifications.isReady,
        notifications: state.notifications.notifications,
        drawerDisabled: state.global.drawerDisabled
    };
}

export default connect(mapStateToProps)(NotificationButton);
