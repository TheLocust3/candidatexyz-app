import React from 'react';
import { connect } from 'react-redux';
import { CampaignActions } from 'candidatexyz-common-js';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Loader from '../components/common/Loader';
import EditUserForm from '../components/users/EditUserForm';
import EditCampaignForm from '../components/campaign/EditCampaignForm';

class Settings extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Settings'));
        this.props.dispatch(setBreadcrumb('Settings'));
        this.props.dispatch(setDrawerSelected('settings'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.user.campaignId));
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div className='content'>
                <Text type='headline5'>Campaign Settings</Text>
                <br />

                <Loader isReady={this.props.isReady}>
                    <div className='content-2'>
                        <EditCampaignForm campaign={this.props.campaign} />
                    </div>

                    <Text type='headline5'>User Settings</Text>
                    <br />

                    <div className='content-2'>
                        <EditUserForm user={this.props.user} />
                    </div>
                </Loader>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.currentUser,
        isReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(Settings);
