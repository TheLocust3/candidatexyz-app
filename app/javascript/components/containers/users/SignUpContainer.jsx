import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { setTitle } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import RegisterForm from '../../components/users/RegisterForm';

class SignUpContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign Up'));
    }

    render() {
        return (
            <div className='content-15'>
                <RegisterForm /><br />
                <Link to='/sign_in'><Text type='body1'>Sign in</Text></Link>
            </div>
        );
    }
}

export default connect()(SignUpContainer);
