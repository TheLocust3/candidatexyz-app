import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { NotificationActions, NotificationApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import NotificationList from '../../components/notifications/NotificationList';

class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fetchingCampaigns: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Notifications'));
        this.props.dispatch(setBreadcrumb('Notifications'));
        this.props.dispatch(setDrawerSelected('notifications'));

        this.props.dispatch(NotificationActions.fetchAllNotifications());
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isReady) return;

        let shouldUpdate = false;
        _.map(nextProps.notifications.notifications, ((notification) => {
            if (!notification.read) {
                NotificationApi.update(notification.id, true)
                shouldUpdate = true;
            }
        }));

        if (shouldUpdate) {
            this.props.dispatch(NotificationActions.fetchAllNotifications());
        }
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Notifications</Text>
                <br />

                <NotificationList notifications={this.props.notifications.notifications} refresh={() => this.refresh()} />
            </div>
        );
    }

    private
    refresh() {
        this.props.dispatch(NotificationActions.fetchAllNotifications());
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.notifications.isReady,
        notifications: state.notifications.notifications
    };
}

export default connect(mapStateToProps)(Notifications);
