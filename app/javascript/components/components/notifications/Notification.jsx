import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Notification extends React.Component {

    renderText() {
        let notification = this.props.notification;

        if (_.isEmpty(notification.body)) {
            return <Text type='body2'>{moment(notification.createdAt).format('dddd, MMMM Do YYYY, h:mma')}</Text>;
        }

        return <Text type='body2'>{notification.body}</Text>;
    }

    render() {
        let notification = this.props.notification;

        return (
            <Link className='unstyled-link-black link-no-hover' to={notification.link}>
                <li className='mdc-list-item resource-list-item resource-list-item--dense'>
                    <span className='mdc-list-item__text'>
                        <Text type='body1'>{notification.title}</Text>

                        <span className='mdc-list-item__secondary-text'>
                            {this.renderText()}
                        </span>
                    </span>
                </li>
            </Link>
        );
    }
}

Notification.propTypes = {
    notification: PropTypes.object
};
