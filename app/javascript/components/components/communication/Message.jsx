import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

export default class Message extends React.Component {

    renderName(message) {
        if (_.isEmpty(message.firstName) && _.isEmpty(message.lastName)) return 'N/A';

        return (
            <div>
                {message.firstName} {message.lastName}
            </div>
        )
    }

    render() {
        let message = this.props.message;

        return (
            <div>
                <Text type='headline6'>Name</Text>
                <Text type='body1'>{this.renderName(message)}</Text>
                <br />

                <Text type='headline6'>Email</Text>
                <Text type='body1'>{message.email}</Text>
                <br />

                <Text type='headline6'>Message</Text>
                <Text type='body1'>Subject: {this.props.message.subject}</Text><br />
                
                <Text type='body1'>{message.message}</Text>
            </div>
        )
    }
}

Message.propTypes = {
    message: PropTypes.object
};
