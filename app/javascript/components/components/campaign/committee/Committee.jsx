import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Committee extends React.Component {

    render() {
        let committee = this.props.committee;

        return (
            <div>
                <Text type='body2'><a className='link' href={committee.report.url}>Formation Documents</a></Text>
                <br />

                <Text type='body1'>Contact Info</Text>
                <Text type='body2'>Email: <a className='link' href={`mailto:${committee.email}`}>{committee.email}</a></Text>
                <Text type='body2'>Phone Number: {committee.phoneNumber}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{committee.address}, {committee.city}, {committee.state}{_.isEmpty(committee.country) ? '' : `, ${committee.country}`}</Text>
                <br />

                <Text type='body1'>Running For</Text>
                <Text type='body2'>{committee.office} in {committee.district}</Text>
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
