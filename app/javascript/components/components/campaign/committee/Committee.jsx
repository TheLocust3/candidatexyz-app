import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Committee extends React.Component {

    renderLink() {
        if (this.props.committee.report.status != 'done') return;

        return (
            <div>
                <Text type='body2'><a className='link' href={`/finance/reports/${this.props.committee.report.id}`}>Formation Report</a></Text>
                <br />
            </div>
        );
    }

    renderDissolutionLink() {
        if (!this.props.committee.dissolved || this.props.committee.dissolutionReport.status != 'done') return;

        return (
            <div>
                <Text type='body2'><a className='link' href={`/finance/reports/${this.props.committee.dissolutionReport.id}`}>Dissolution Report</a></Text>
                <br />
            </div>
        );
    }

    renderError() {
        if (!_.includes(_.lowerCase(this.props.committee.report.status), 'error')) return;

        return (
            <Text type='body2'>
                Error encountered while generating formation documents. Please try again
                <br /><br />
            </Text>
        );
    }

    render() {
        let committee = this.props.committee;

        return (
            <div>
                {this.renderError()}
                {this.renderLink()}
                {this.renderDissolutionLink()}

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
