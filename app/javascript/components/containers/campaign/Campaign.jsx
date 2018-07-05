import React from 'react';
import { connect } from 'react-redux';
import { StaffActions, CampaignActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import StaffOverview from '../../components/campaign/StaffOverview';

class Campaign extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Campaign'));
        this.props.dispatch(setDrawerSelected('campaign'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.currentUser.campaignId));
        this.props.dispatch(StaffActions.fetchAllUsers());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>{this.props.campaign.name}</Text>
                <br /><br />

                <div className='content-2'>
                    <Text type='headline6'>Staff</Text>

                    <Loader isReady={this.props.areUsersReady && this.props.isCampaignReady}>
                        <StaffOverview users={this.props.users.users} />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.users.currentUser,
        areUsersReady: state.users.isReady,
        users: state.users.users,
        isCampaignReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(Campaign);
