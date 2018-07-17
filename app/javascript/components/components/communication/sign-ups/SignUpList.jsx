import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import Pager from '../../common/Pager';
import SignUpThumbnail from './SignUpThumbnail';

const PER_PAGE = 10;

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
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line'>
                {_.slice(_.reverse(_.sortBy(this.props.contacts, (contact) => { return contact.createdAt })), page * PER_PAGE, (page + 1) * PER_PAGE).map((contact, index) => {
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
            return (
                <div>
                    {this.renderList()}
                    <br />

                    <Pager elements={this.props.contacts} elementsPerPage={PER_PAGE} baseLink='/communication/sign-ups' />
                </div>
            );
        }
    }
}

SignUpList.propTypes = {
    contacts: PropTypes.array
};
