import React from 'react';
import { connect } from 'react-redux';
import { CampaignActions } from 'candidatexyz-common-js';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Loader from '../components/common/Loader';
import EditUserForm from '../components/users/EditUserForm';
import SuperuserForm from '../components/users/SuperuserForm';
import EditCampaignForm from '../components/campaign/EditCampaignForm';

class Notifications extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fetchingCampaigns: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Notifications'));
        this.props.dispatch(setBreadcrumb('Notifications'));
        this.props.dispatch(setDrawerSelected('notifications'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Notifications</Text>
                <br />
            </div>
        );
    }
}

export default connect()(Notifications);
