import React from 'react';
import { Link } from 'react-router-dom';

class NotificationButton extends React.Component {

    render() {
        return (
            <div className='notification-button-wrapper'>
                <div className='middle'>
                    <Link className='unstyled-link unstyled-link-black' to='/notifications'>
                        <i className='material-icons'>notifications_none</i>
                    </Link>
                </div>
            </div>
        );
    }
}

export default NotificationButton;
