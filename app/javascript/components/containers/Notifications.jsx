import React from 'react';
import { connect } from 'react-redux';
import { NotificationActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import NotificationList from '../components/notifications/NotificationList';

class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fetchingCampaigns: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Notifications'));
        this.props.dispatch(setBreadcrumb('Notifications'));
        this.props.dispatch(setDrawerSelected('notifications'));

        this.props.dispatch(NotificationActions.fetchAllNotifications())
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Notifications</Text>
                <br />

                <NotificationList notifications={this.props.notifications.notifications} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.notifications.isReady,
        notifications: state.notifications.notifications
    };
}

export default connect(mapStateToProps)(Notifications);
