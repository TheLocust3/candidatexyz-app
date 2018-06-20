import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../components/actions/user-actions';

import Skeleton from '../components/containers/Skeleton';
import NotFound from '../components/containers/NotFound';

import Index from '../components/containers/Index';
import Website from '../components/containers/Website';
import Settings from '../components/containers/Settings';
import SignIn from '../components/containers/users/SignInContainer';

import Communication from '../components/containers/communication/Communication';
import Volunteers from '../components/containers/communication/Volunteers';
import SignUps from '../components/containers/communication/SignUps';
import Messages from '../components/containers/communication/Messages';

class AppRoutes extends React.Component {

    componentWillMount() {
        this.props.dispatch(fetchCurrentUser());
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
                        <Route exact path='/communication/volunteers' component={Volunteers} />
                        <Route exact path='/communication/sign-ups' component={SignUps} />
                        <Route exact path='/communication/Messages' component={Messages} />
                        
                        <Route component={NotFound} />
                    </Switch>
                </Route>
            </Skeleton>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(AppRoutes);
