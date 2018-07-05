import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

import MessageThumbnail from './messages/MessageThumbnail';

export default class MessagesOverview extends React.Component {

    renderNumberOfMessages() {
        if (this.props.messages.length == 1) {
            return '1 Message'
        } else {
            return `${this.props.messages.length} Messages`
        }
    }

    renderNonSmall() {
        if (this.props.small) return;
        let recent = _.last(_.sortBy(this.props.messages, (message) => { return moment(message.createdAt).unix() }));

        return (
            <div style={{ marginTop: '3%' }}>
                <Text type='body1'>Recent Message</Text>
                <MessageThumbnail message={recent} dense />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Link className='link' to='/communication/messages'>
                    <Text type='body2'>{this.renderNumberOfMessages()}</Text>
                </Link>
                
                {this.renderNonSmall()}
            </div>
        )
    }
}

MessagesOverview.propTypes = {
    messages: PropTypes.array,
    small: PropTypes.bool
};
