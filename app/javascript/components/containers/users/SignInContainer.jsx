import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { setTitle } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import Text from '../../components/common/Text';
import SignInForm from '../../components/users/SignInForm';

class SignInContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign In'));
    }

    render() {
        return (
            <div className='content-15'>
                <SignInForm /><br />
                
                <Link to='/sign_up'><Text type='body1'>Sign up</Text></Link>
                <Link to='/forgot_password'><Text type='body1'>Forgot your password?</Text></Link>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(SignInContainer);
