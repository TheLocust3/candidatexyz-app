import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { setTitle } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import ResetPasswordForm from '../../components/users/ResetPasswordForm';

class ResetPasswordContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Reset Password'));
    }

    render() {
        let parsed = queryString.parse(location.search);

        return (
            <div className='content-15'>
                <ResetPasswordForm token={parsed.reset_password_token} /><br />
                <Link to='/sign_in'>Sign in</Link><br />

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(ResetPasswordContainer);
