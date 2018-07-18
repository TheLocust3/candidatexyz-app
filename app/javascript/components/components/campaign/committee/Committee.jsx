import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Committee extends React.Component {

    render() {
        let committee = this.props.committee;

        return (
            <div>
                <Text type='body2'><a className='link' href={committee.report.url}>Formation Document</a></Text>
                <br />

                <Text type='body1'>Email</Text>
                <Text type='body2'>{committee.email}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{committee.phoneNumber}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{committee.address}, {committee.city}, {committee.state}, {committee.country}</Text>
                <br />

                <Text type='body1'>Office</Text>
                <Text type='body2'>{committee.office}</Text>
                <br />

                <Text type='body1'>District</Text>
                <Text type='body2'>{committee.district}</Text>
                <br />

                <Text type='body1'>Bank</Text>
                <Text type='body2'>{committee.bank}</Text>
            </div>
        )
    }
}

Committee.propTypes = {
    committee: PropTypes.object
};
