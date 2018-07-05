import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import RegisterForm from '../../components/users/RegisterForm';

class SignUpContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
    }

    render() {
        return (
            <div className='fullpage relative'>
                <div className='sign-in-box middle-center'>
                    <Text type='headline4'>Sign Up</Text><br />

                    <div className='content-5'>
                        <RegisterForm /><br />

                        <Link to='/sign_in'><Text type='body2'>Sign in</Text></Link>
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(SignUpContainer);
