import React from 'react';
import { connect } from 'react-redux';
import { CommitteeActions, UserActions, CampaignActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import CommitteeForm from '../../../components/campaign/committee/CommitteeForm';
import CommitteeChecklist from '../../../components/campaign/committee/CommitteeChecklist';

class CreateCommittee extends React.Component {

    constructor(props) {
        super(props);

        this.state = { checklistComplete: false, recreate: _.includes(window.location.href, 'new') };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Create Committee'));
        this.props.dispatch(setBreadcrumb('Committee'));
        this.props.dispatch(setDrawerSelected('campaign', 'committee'));

        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
        this.props.dispatch(UserActions.fetchAllUsersWithPositions());
        this.props.dispatch(CampaignActions.fetchCampaign(this.props.user.campaignId));
    }

    renderCommitteeForm() {
        if (this.state.checklistComplete) {
            return <CommitteeForm campaign={this.props.campaign} committee={this.props.committee} recreate={this.state.recreate} />;
        } else {
            return (
                <Text type='body1'>
                    Before creating forming your campaign's committee, you must complete the above checklist
                </Text>
            );
        }
    }

    render() {
        if (!this.state.recreate && !_.isEmpty(this.props.committee)) return null;

        return (
            <div className='content'>
                <Text type='headline5'>Create Committee</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.areUsersReady && this.props.isCampaignReady}>
                        <CommitteeChecklist users={this.props.users.users} complete={() => { this.setState({ checklistComplete: true }) }} />

                        {this.renderCommitteeForm()}
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.committees.isReady,
        committee: state.committees.committee,
        areUsersReady: state.users.isReady,
        users: state.users.users,
        user: state.users.currentUser,
        isCampaignReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(CreateCommittee);
