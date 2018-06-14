import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { setTitle } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import SignInForm from '../../components/users/SignInForm';

class SignInContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign In'));
    }

    render() {
        return (
            <div className='content-15'>
                <SignInForm /><br />
                
                <Link to='/sign_up'>Sign up</Link><br />
                <Link to='/forgot_password'>Forgot your password?</Link>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(SignInContainer);
