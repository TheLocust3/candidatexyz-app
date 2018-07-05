import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import SignInForm from '../../components/users/SignInForm';

class SignInContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign In'));
        this.props.dispatch(setBreadcrumb('Sign In'));
    }

    render() {
        return (
            <div className='fullpage relative'>
                <div className='sign-in-box middle-center'>
                    <Text type='headline4'>Sign In</Text><br />

                    <div className='content-5'>
                        <SignInForm /><br />

                        <Link to='/forgot_password'><Text type='body2'>Forgot your password?</Text></Link>
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(SignInContainer);
