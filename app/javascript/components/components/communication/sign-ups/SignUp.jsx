import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

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
                <Text type='body1'>Contact</Text>
                <Text type='body2'>Email: <a className='link' href={`mailto:${contact.email}`}>{_.lowerCase(contact.email)}</a></Text>
                <Text type='body2'>PhoneNumber: {_.isEmpty(contact.phoneNumber) ? 'N/A' : contact.phoneNumber}</Text>
                <br />

                <Text type='body1'>Zipcode</Text>
                <Text type='body2'>{_.isEmpty(contact.zipcode) ? 'N/A' : contact.zipcode}</Text>
            </div>
        )
    }
}

SignUp.propTypes = {
    contact: PropTypes.object
};
