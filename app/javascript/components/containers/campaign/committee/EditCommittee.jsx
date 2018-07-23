import React from 'react';
import { connect } from 'react-redux';
import { CommitteeActions, CommitteeApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import CommitteeForm from '../../../components/campaign/committee/CommitteeForm';

class EditCommittee extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Committee'));
        this.props.dispatch(setBreadcrumb('Committee'));
        this.props.dispatch(setDrawerSelected('campaign', 'committee'));

        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;
        
        CommitteeApi.destroy(this.props.committee.id).then(() => {
            history.push('/campaign');
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Create Committee</Text>
                <div className='resource-actions-under'>
                    <a className='resource-actions-item unstyled-link-black delete' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <CommitteeForm committee={this.props.committee} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/campaign/committee' />
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

export default connect(mapStateToProps)(EditCommittee);
