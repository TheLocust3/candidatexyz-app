import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class MessageEmail extends React.Component {

    renderName(message) {
        if (_.isEmpty(message.firstName) && _.isEmpty(message.lastName)) return 'N/A';

        return (
            <div style={{ display: 'inline' }}>
                {message.firstName} {message.lastName}
            </div>
        )
    }

    render() {
        let message = this.props.message;

        return (
            <div>
                <Text type='body2'>From: {message.email} ({this.renderName(message)})</Text>
                <Text type='body2'>Subject: {this.props.message.subject}</Text><br />
                
                <Text type='body2'>
                    Message:<br />
                    {message.message}
                </Text>
            </div>
        )
    }
}

MessageEmail.propTypes = {
    message: PropTypes.object
};
