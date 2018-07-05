import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import ResetPasswordForm from '../../components/users/ResetPasswordForm';

class ResetPasswordContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Reset Password'));
        this.props.dispatch(setBreadcrumb('Reset Password'));
    }

    render() {
        let parsed = queryString.parse(location.search);

        return (
            <div className='fullpage relative'>
                <div className='sign-in-box middle-center'>
                    <Text type='headline4'>Reset Password</Text><br />

                    <div className='content-5'>
                        <ResetPasswordForm token={parsed.reset_password_token} /><br />

                        <Link to='/sign_in'><Text type='body2'>Sign in</Text></Link>
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(ResetPasswordContainer);
