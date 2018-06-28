import React from 'react';
import { connect } from 'react-redux';
import { CampaignActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Text from '../components/common/Text';

class Index extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
        this.props.dispatch(setBreadcrumb('Home'));
        this.props.dispatch(setDrawerSelected('home'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.currentUser.campaignId));
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div className='content'>
                <Text type='headline5'>{this.props.campaign.name}</Text>
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

export default connect(mapStateToProps)(Index);
