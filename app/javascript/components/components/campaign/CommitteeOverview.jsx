import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class CommitteeOverview extends React.Component {

    render() {
        return (
            <div>
                <Text type='headline6'>Committee</Text>
                <Text type='body2'><a className='link' href={this.props.committee.report.url}>Formation Documents</a></Text>
                <br />

                <Text type='body1'>Name</Text>
                <Text type='body2'>{this.props.committee.name}</Text>
            </div>
        )
    }
}

CommitteeOverview.propTypes = {
    committee: PropTypes.object
};
