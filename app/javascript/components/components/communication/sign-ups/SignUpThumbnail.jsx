import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Text from '../../common/Text';

export default class SignUpThumbnail extends React.Component {

    renderZipcode(zipcode) {
        if (_.isEmpty(zipcode)) return;

        return (
            <span>
                ({zipcode})
            </span>
        );
    }

    render() {
        let contact = this.props.contact;

        let denseClassName = this.props.dense ? 'resource-list-item--dense' : '';
        let titleType = this.props.dense ? 'body2' : 'body1';
        let subtitleType = this.props.dense ? 'caption' : 'body2';

        return (
            <Link className='unstyled-link-black link-no-hover' to={`/communication/sign-ups/${contact.id}`}>
                <li className={`mdc-list-item resource-list-item ${denseClassName}`}>
                    <span className='mdc-list-item__text'>
                        <Text type={titleType}>
                            {contact.firstName} {contact.lastName} {this.renderZipcode(contact.zipcode)}
                        </Text>

                        <span className='mdc-list-item__secondary-text'>
                            <Text type={subtitleType}>
                                Email: {contact.email}<br />
                                Phone Number: {_.isEmpty(contact.phoneNumber) ? 'N/A' : contact.phoneNumber}
                            </Text>
                        </span>
                    </span>
                </li>
            </Link>
        );
    }
}

SignUpThumbnail.propTypes = {
    contact: PropTypes.object,
    dense: PropTypes.bool
};
