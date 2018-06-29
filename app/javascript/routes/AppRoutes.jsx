import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserActions, setCampaignId } from 'candidatexyz-common-js';

import Skeleton from '../components/containers/Skeleton';
import NotFound from '../components/containers/NotFound';

import Index from '../components/containers/Index';
import Website from '../components/containers/Website';
import Settings from '../components/containers/Settings';
import SignIn from '../components/containers/users/SignInContainer';

import Campaign from '../components/containers/campaign/Campaign';
import Staff from '../components/containers/campaign/Staff';
import EditUser from '../components/containers/campaign/EditUser';
import InviteStaff from '../components/containers/campaign/InviteStaff';
import StaffSignUp from '../components/containers/campaign/StaffSignUp';

import ShowUser from '../components/containers/campaign/ShowUser';

import Communication from '../components/containers/communication/Communication';
import Volunteers from '../components/containers/communication/volunteers/Volunteers';
import SignUps from '../components/containers/communication/sign-ups/SignUps';
import Messages from '../components/containers/communication/messages/Messages';
import Mail from '../components/containers/communication/Mail';

import ShowSignUp from '../components/containers/communication/sign-ups/ShowSignUp';
import ShowMessage from '../components/containers/communication/messages/ShowMessage';
import ShowVolunteer from '../components/containers/communication/volunteers/ShowVolunteer';

import EditSignUp from '../components/containers/communication/sign-ups/EditSignUp';
import EditVolunteer from '../components/containers/communication/volunteers/EditVolunteer';

class AppRoutes extends React.Component {

    componentWillMount() {
        this.props.dispatch(UserActions.fetchCurrentUser());
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isReady || _.isEmpty(nextProps.user)) return;
        
        setCampaignId(nextProps.user.campaignId);
    }

    render() {
        if (!this.props.isReady) return null;
        if (_.isEmpty(this.props.user)) return <SignIn />;

        return (
            <Skeleton>
                <Route>
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route exact path='/website' component={Website} />
                        <Route exact path='/settings' component={Settings} />

                        <Route exact path='/communication' component={Communication} />
                        <Route exact path='/communication/mail' component={Mail} />

                        <Route exact path='/communication/sign-ups' component={SignUps} />
                        <Route exact path='/communication/sign-ups/:id' component={ShowSignUp} />
                        <Route exact path='/communication/sign-ups/:id/edit' component={EditSignUp} />

                        <Route exact path='/communication/volunteers' component={Volunteers} />
                        <Route exact path='/communication/volunteers/:id' component={ShowVolunteer} />
                        <Route exact path='/communication/volunteers/:id/edit' component={EditVolunteer} />

                        <Route exact path='/communication/messages' component={Messages} />
                        <Route exact path='/communication/messages/:id' component={ShowMessage} />

                        <Route exact path='/campaign' component={Campaign} />
                        <Route exact path='/campaign/staff' component={Staff} />
                        <Route exact path='/campaign/staff/:id' component={ShowUser} />
                        <Route exact path='/campaign/staff/:id/edit' component={EditUser} />
                        <Route exact path='/campaign/invite-staff' component={InviteStaff} />
                        <Route exact path='/campaign/sign-up/:token' component={StaffSignUp} />
                        
                        <Route component={NotFound} />
                    </Switch>
                </Route>
            </Skeleton>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isCurrentUserReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(AppRoutes);
