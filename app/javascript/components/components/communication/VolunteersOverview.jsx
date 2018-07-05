import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

import VolunteerThumbnail from './volunteers/VolunteerThumbnail';

export default class VolunteersOverview extends React.Component {

    renderNumberOfVolunteers() {
        if (this.props.volunteers.length == 1) {
            return '1 Volunteer'
        } else {
            return `${this.props.volunteers.length} Volunteers`
        }
    }

    renderNonSmall() {
        if (this.props.small) return;
        let recent = _.last(_.sortBy(this.props.volunteers, (volunteer) => { moment(volunteer.createdAt).unix() }));

        return (
            <div style={{ marginTop: '3%' }}>
                <Text type='body1'>Recent Volunteer</Text>
                
                <VolunteerThumbnail volunteer={recent} dense />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Link className='link' to='/communication/volunteers'>
                    <Text type='body2'>{this.renderNumberOfVolunteers()}</Text>
                </Link>
                <br />

                {this.renderNonSmall()}
            </div>
        )
    }
}

VolunteersOverview.propTypes = {
    volunteers: PropTypes.array,
    small: PropTypes.bool
};
