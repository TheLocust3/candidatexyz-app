import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Text from '../common/Text';

export default class MessageList extends React.Component {

    renderList(messages) {
        return (
            <ul className='mdc-list mdc-list--two-line'>
                {messages.map((message, index) => {
                    return (
                        <Link key={index} className='unstyled-link-black link-no-hover' to={`/communication/messages/${message.id}`}>
                            <li className='mdc-list-item'>
                                <span className='mdc-list-item__text'>
                                    {message.firstName} {message.lastName}

                                    <span className='mdc-list-item__secondary-text'>
                                        {message.subject}
                                    </span>
                                </span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        );
    }

    renderNone() {
        return <Text type='body1'>You currently have no messages!</Text>;
    }

    render() {
        if (_.isEmpty(this.props.messages)) {
            return this.renderNone();
        } else {
            return this.renderList(this.props.messages);
        }
    }
}

MessageList.propTypes = {
    messages: PropTypes.array
};
