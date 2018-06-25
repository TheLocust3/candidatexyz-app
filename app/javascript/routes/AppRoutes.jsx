import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserActions } from 'candidatexyz-common-js';

import Skeleton from '../components/containers/Skeleton';
import NotFound from '../components/containers/NotFound';

import Index from '../components/containers/Index';
import Website from '../components/containers/Website';
import Settings from '../components/containers/Settings';
import SignIn from '../components/containers/users/SignInContainer';

import Campaign from '../components/containers/campaign/Campaign';
import Staff from '../components/containers/campaign/Staff';

import ShowUser from '../components/containers/campaign/ShowUser';

import Communication from '../components/containers/communication/Communication';
import Volunteers from '../components/containers/communication/Volunteers';
import SignUps from '../components/containers/communication/SignUps';
import Messages from '../components/containers/communication/Messages';

import ShowSignUp from '../components/containers/communication/ShowSignUp';
import ShowMessage from '../components/containers/communication/ShowMessage';
import ShowVolunteer from '../components/containers/communication/ShowVolunteer';

import EditSignUp from '../components/containers/communication/EditSignUp';

class AppRoutes extends React.Component {

    componentWillMount() {
        this.props.dispatch(UserActions.fetchCurrentUser());
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

                        <Route exact path='/communication/sign-ups' component={SignUps} />
                        <Route exact path='/communication/sign-ups/:id' component={ShowSignUp} />
                        <Route exact path='/communication/sign-ups/:id/edit' component={EditSignUp} />

                        <Route exact path='/communication/volunteers/:id' component={ShowVolunteer} />
                        <Route exact path='/communication/volunteers' component={Volunteers} />

                        <Route exact path='/communication/messages' component={Messages} />
                        <Route exact path='/communication/messages/:id' component={ShowMessage} />

                        <Route exact path='/campaign' component={Campaign} />
                        <Route exact path='/campaign/staff' component={Staff} />

                        <Route exact path='/campaign/staff/:id' component={ShowUser} />
                        
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
