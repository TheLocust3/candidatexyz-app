import React from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import ResetPasswordForm from '../../components/users/ResetPasswordForm';

export default class ResetPasswordContainer extends React.Component {

    render() {
        let parsed = queryString.parse(location.search);

        return (
            <div className='content-15'>
                <ResetPasswordForm redirectUrl="/" token={parsed.reset_password_token} /><br />
                <Link to="/sign_in">Sign in</Link><br />

                <MDCAutoInit />
            </div>
        );
    }
}
