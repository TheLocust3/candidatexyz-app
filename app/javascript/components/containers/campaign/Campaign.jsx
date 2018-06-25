import React from 'react';
import { connect } from 'react-redux';
import { CampaignActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class Campaign extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Campaign'));
        this.props.dispatch(setDrawerSelected('campaign'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.currentUser.campaignId));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Campaign Overview</Text>

                <Text type='headline6'>{this.props.campaign.name}</Text>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.users.currentUser,
        isReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(Campaign);
