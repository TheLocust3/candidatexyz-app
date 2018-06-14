import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { setTitle } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import ForgotPasswordForm from '../../components/users/ForgotPasswordForm';

class ForgotPasswordContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Forgot Password'));
    }

    render() {
        return (
            <div className='content-15'>
                <ForgotPasswordForm /><br />

                <Link to='/sign_in'><Text type='body1'>Sign in</Text></Link>
            </div>
        );
    }
}

export default connect()(ForgotPasswordContainer);
