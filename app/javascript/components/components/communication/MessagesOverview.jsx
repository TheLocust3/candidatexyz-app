import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Text from '../common/Text';
import MessageThumbnail from './messages/MessageThumbnail';

export default class MessagesOverview extends React.Component {

    renderNumberOfMessages() {
        if (this.props.messages.length == 1) {
            return '1 Message'
        } else {
            return `${this.props.messages.length} Messages`
        }
    }

    render() {
        let recent = _.last(_.sortBy(this.props.messages, (message) => { return moment(message.createdAt).unix() }));

        return (
            <div>
                <Link className='link' to='/communication/messages'>
                    <Text type='body2'>{this.renderNumberOfMessages()}</Text>
                </Link>
                
                <br /><br />
                
                <Text type='body1'>Recent Message</Text>
                <MessageThumbnail message={recent} dense/>
            </div>
        )
    }
}

MessagesOverview.propTypes = {
    messages: PropTypes.array
};
