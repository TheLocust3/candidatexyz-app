import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Committee extends React.Component {

    renderLink() {
        if (this.props.committee.report.status != 'done') return;

        return (
            <div>
                <Text type='body2'><a className='link' href={this.props.committee.report.url}>Formation Documents</a></Text>
                <br />
            </div>
        );
    }

    renderError() {
        if (this.props.committee.report.status != 'error') return;

        return (
            <Text type='body2'>
                Error encountered while generating formation documetns. Please try again
                <br />
            </Text>
        );
    }

    render() {
        let committee = this.props.committee;

        return (
            <div>
                {this.renderError()}
                {this.renderLink()}

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
