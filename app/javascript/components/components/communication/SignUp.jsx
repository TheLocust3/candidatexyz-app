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
                <Text type='headline6'>Name</Text>
                <Text type='body1'>{this.renderName(contact)}</Text>
                <br />

                <Text type='headline6'>Email</Text>
                <Text type='body1'>{contact.email}</Text>
                <br />

                <Text type='headline6'>Zipcode</Text>
                <Text type='body1'>{_.isEmpty(contact.zipcode) ? 'N/A' : contact.zipcode}</Text>
                <br />

                <Text type='headline6'>Phone Number</Text>
                <Text type='body1'>{_.isEmpty(contact.phoneNumber) ? 'N/A' : contact.phoneNumber}</Text>
            </div>
        )
    }
}

SignUp.propTypes = {
    contact: PropTypes.object
};
