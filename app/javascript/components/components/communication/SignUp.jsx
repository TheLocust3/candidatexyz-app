import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

export default class SignUp extends React.Component {

    renderName(contact) {
        if (_.isEmpty(contact.firstName) && _.isEmpty(contact.lastName)) return 'N/A';

        return (
            <div>
                {contact.firstName} {contact.lastName}
            </div>
        )
    }

    render() {
        let contact = this.props.contact;

        return (
            <div>
                <Text type='body1'>Name</Text>
                <Text type='body2'>{this.renderName(contact)}</Text>
                <br />

                <Text type='body1'>Email</Text>
                <Text type='body2'>{contact.email}</Text>
                <br />

                <Text type='body1'>Zipcode</Text>
                <Text type='body2'>{_.isEmpty(contact.zipcode) ? 'N/A' : contact.zipcode}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(contact.phoneNumber) ? 'N/A' : contact.phoneNumber}</Text>
            </div>
        )
    }
}

SignUp.propTypes = {
    contact: PropTypes.object
};
