import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Message extends React.Component {

    renderName(message) {
        if (_.isEmpty(message.firstName) && _.isEmpty(message.lastName)) return 'N/A';

        return (
            <span>
                {message.firstName} {message.lastName}
            </span>
        )
    }

    render() {
        let message = this.props.message;

        return (
            <div>
                <Text type='body1'>From</Text>
                <Text type='body2'>{this.renderName(message)} (<a className='link' href={`mailto:${message.email}`}>{_.lowerCase(message.email)}</a>)</Text>
                <br />

                <Text type='body1'>Message</Text>
                <Text type='body2'>Subject: {this.props.message.subject}</Text><br />
                
                <Text type='body2'>{message.message}</Text>
            </div>
        )
    }
}

Message.propTypes = {
    message: PropTypes.object
};
