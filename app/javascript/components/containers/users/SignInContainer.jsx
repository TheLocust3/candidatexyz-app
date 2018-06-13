import React from 'react';
import { Link } from 'react-router-dom'

import MDCAutoInit from '../../components/global/MDCAutoInit';
import SignInForm from '../../components/users/SignInForm';

export default class SignInContainer extends React.Component {

    render() {
        return (
            <div className='content-15'>
                <SignInForm redirectUrl="/" /><br />
                
                <Link to="/sign_up">Sign up</Link><br />
                <Link to="/forgot_password">Forgot your password?</Link>

                <MDCAutoInit />
            </div>
        );
    }
}
