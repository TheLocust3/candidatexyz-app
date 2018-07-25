import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { StaffActions } from 'candidatexyz-common-js';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import BackLink from '../../components/common/BackLink';
import CampaignForm from '../../components/setup/CampaignForm';

class CampaignSetup extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Setup Campaign'));
        this.props.dispatch(setBreadcrumb('Setup'));

        this.props.dispatch(StaffActions.fetchStaffPositions());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Tell us about your campaign</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isCurrentUserReady}>
                        <CampaignForm user={this.props.user} />
                    </Loader>
                </div>

                <BackLink to='/user' />

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isCurrentUserReady: state.users.isCurrentUserReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(CampaignSetup);
