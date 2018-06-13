import _ from 'lodash';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCurrentUser } from '../components/actions/user-actions';

import Skeleton from '../components/containers/Skeleton';

import Index from '../components/containers/Index';
import SignIn from '../components/containers/users/SignInContainer';
import EditUserContainer from '../components/containers/users/EditUserContainer';

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
                        
                        <Route exact path='/users/edit' component={EditUserContainer} />
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
