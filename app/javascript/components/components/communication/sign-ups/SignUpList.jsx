import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Text from '../../common/Text';
import SignUpThumbnail from './SignUpThumbnail';

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
                        <div key={index}>
                            <SignUpThumbnail contact={contact} />
                        </div>
                    );
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
