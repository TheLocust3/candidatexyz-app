import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class CommitteeOverview extends React.Component {

    renderLink() {
        if (this.props.committee.report.status != 'done') return;

        return (
            <div>
                <Text type='body2'><a className='link' href={this.props.committee.report.url}>Formation Documents</a></Text>
                <br />
            </div>
        );
    }

    render() {
        if (_.isEmpty(this.props.committee)) return null;

        return (
            <div>
                <Text type='headline6'>Committee</Text>
                {this.renderLink()}

                <Text type='body1'>Name</Text>
                <Text type='body2'>{this.props.committee.name}</Text>
            </div>
        )
    }
}

CommitteeOverview.propTypes = {
    committee: PropTypes.object
};
