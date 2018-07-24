import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { NotificationApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Notification extends React.Component {

    renderText() {
        let notification = this.props.notification;

        if (_.isEmpty(notification.body)) {
            return <Text type='body2'>{moment(notification.createdAt).format('dddd, MMMM Do YYYY, h:mma')}</Text>;
        }

        return <Text type='body2'>{notification.body}</Text>;
    }

    deleteNotification(event) {
        event.preventDefault();
        event.stopPropagation();

        NotificationApi.destroy(this.props.notification.id).then(() => {
            this.props.refresh();
        });
    }

    render() {
        let notification = this.props.notification;

        return (
            <Link className='unstyled-link-black link-no-hover' to={notification.link}>
                <li className='mdc-list-item resource-list-item resource-list-item--dense notification'>
                    <span className='mdc-list-item__text'>
                        <Text type='body1'>{notification.title}</Text>

                        <span className='mdc-list-item__secondary-text'>
                            {this.renderText()}
                        </span>
                    </span>

                    <span className='mdc-list-item__meta material-icons delete' aria-hidden='true' onClick={this.deleteNotification.bind(this)}>
                        delete
                    </span>
                </li>
            </Link>
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired,
    refresh: PropTypes.func.isRequired
};
