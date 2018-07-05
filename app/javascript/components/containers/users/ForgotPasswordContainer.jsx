import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import ForgotPasswordForm from '../../components/users/ForgotPasswordForm';

class ForgotPasswordContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Forgot Password'));
        this.props.dispatch(setBreadcrumb('Forgot Password'));
    }

    render() {
        return (
            <div className='fullpage relative'>
                <div className='sign-in-box middle-center'>
                    <Text type='headline4'>Forgot Password</Text><br />

                    <div className='content-5'>
                        <ForgotPasswordForm /><br />

                        <Link to='/sign_in'><Text type='body2'>Sign in</Text></Link>
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(ForgotPasswordContainer);
