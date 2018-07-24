import React from 'react';
import { Link } from 'react-router-dom';

class NotificationButton extends React.Component {

    renderNotificationImportant() {
        return <i className='material-icons'>notification_important</i>;
    }

    renderNotificationNone() {
        return <i className='material-icons'>notifications_none</i>;
    }

    render() {
        return (
            <div className='notification-button-wrapper'>
                <div className='middle'>
                    <Link className='unstyled-link unstyled-link-black' to='/notifications'>
                        {this.renderNotificationNone()}
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotificationButton;
