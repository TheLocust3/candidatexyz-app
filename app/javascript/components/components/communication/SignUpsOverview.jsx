import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Text from '../common/Text';
import SignUpThumbnail from './sign-ups/SignUpThumbnail';

export default class ContactsOverview extends React.Component {

    renderNumberOfContacts() {
        if (this.props.contacts.length == 1) {
            return '1 Sign Up'
        } else {
            return `${this.props.contacts.length} Sign Ups`
        }
    }

    render() {
        let recent = _.last(_.sortBy(this.props.contacts, (contact) => { moment(contact.createdAt).unix() }));

        return (
            <div>
                <Link className='link' to='/communication/sign-ups'>
                    <Text type='body2'>{this.renderNumberOfContacts()}</Text>
                </Link>

                <br /><br />
                
                <Text type='body1'>Recent Sign Up</Text>
                <SignUpThumbnail contact={recent} dense/>
            </div>
        )
    }
}

ContactsOverview.propTypes = {
    contacts: PropTypes.array
};
