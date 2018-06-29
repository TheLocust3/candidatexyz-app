import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Text from '../../common/Text';

export default class VolunteerThumbnail extends React.Component {

    renderZipcode(zipcode) {
        if (_.isEmpty(zipcode)) return;

        return (
            <span>
                ({zipcode})
            </span>
        );
    }

    renderThumbnail() {
        let volunteer = this.props.volunteer;

        let denseClassName = this.props.dense ? 'resource-list-item--dense' : '';
        let titleType = this.props.dense ? 'body2' : 'body1';
        let subtitleType = this.props.dense ? 'caption' : 'body2';

        return (
            <Link className='unstyled-link-black link-no-hover' to={`/communication/volunteers/${volunteer.id}`}>
                <li className={`mdc-list-item resource-list-item ${denseClassName}`}>
                    <span className='mdc-list-item__text'>
                        <Text type={titleType}>
                            {volunteer.firstName} {volunteer.lastName} {this.renderZipcode(volunteer.zipcode)}
                        </Text>

                        <span className='mdc-list-item__secondary-text'>
                            <Text type={subtitleType}>
                                Email: {volunteer.email}<br />
                                Help Type: {volunteer.helpBlurb}
                            </Text>
                        </span>
                    </span>
                </li>
            </Link>
        );
    }

    render() {
        if (_.isEmpty(this.props.volunteer)) {
            return (
                <Text type='body2'>
                    None
                </Text>
            )
        } else {
            return this.renderThumbnail();
        }
    }
}

VolunteerThumbnail.propTypes = {
    volunteer: PropTypes.object,
    dense: PropTypes.bool
};
