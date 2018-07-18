import React from 'react';
import { connect } from 'react-redux';
import { CommitteeActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import CommitteeForm from '../../../components/campaign/committee/CommitteeForm';

class CreateCommittee extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Committee'));
        this.props.dispatch(setBreadcrumb('Committee'));
        this.props.dispatch(setDrawerSelected('campaign', 'committee'));

        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
    }

    render() {
        if (!_.isEmpty(this.props.committee)) return null;

        return (
            <div className='content'>
                <Text type='headline5'>Create Committee</Text>
                <br />

                <div className='content-2'>
                    <CommitteeForm />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.committees.isReady,
        committee: state.committees.committee
    };
}

export default connect(mapStateToProps)(CreateCommittee);
