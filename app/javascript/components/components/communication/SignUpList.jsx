import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

export default class SignUpList extends React.Component {

    renderZipcode(zipcode) {
        if (_.isEmpty(zipcode)) return;

        return (
            <span>
                ({zipcode})
            </span>
        );
    }

    renderList() {
        return (
            <ul className='mdc-list mdc-list--two-line'>
                {this.props.contacts.map((contact, index) => {
                    return (
                        <li key={index} className='mdc-list-item'>
                            <span className='mdc-list-item__text'>
                                {contact.firstName} {contact.lastName} {this.renderZipcode(contact.zipcode)}

                                <span className='mdc-list-item__secondary-text'>
                                    Email: {contact.email}<br />
                                    Phone Number: {contact.phoneNumber}
                                </span>
                            </span>
                        </li>
                    )
                })}
            </ul>
        );
    }

    renderNone() {
        return <Text type='body1'>You currently have no sign ups!</Text>;
    }

    render() {
        if (_.isEmpty(this.props.contacts)) {
            return this.renderNone();
        } else {
            return this.renderList();
        }
    }
}

SignUpList.propTypes = {
    contacts: PropTypes.array
};
