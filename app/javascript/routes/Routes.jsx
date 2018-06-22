import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { history } from '../constants';

import AppRoutes from './AppRoutes';

import SignInContainer from '../components/containers/users/SignInContainer';
import SignUpContainer from '../components/containers/users/SignUpContainer';
import ForgotPasswordContainer from '../components/containers/users/ForgotPasswordContainer';
import ResetPasswordContainer from '../components/containers/users/ResetPasswordContainer';

// Always start navigation at the top of the page
const ScrollToTop = () => {
    window.scrollTo(0, 0);

    return null;
};

class Routes extends React.Component {

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route component={ScrollToTop} />

                    <Switch>
                        <Route exact path='/sign_in' component={SignInContainer} />
                        <Route exact path='/sign_up' component={SignUpContainer} />
                        <Route exact path='/forgot_password' component={ForgotPasswordContainer} />
                        <Route exact path='/reset_password' component={ResetPasswordContainer} />

                        <AppRoutes />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Routes;
