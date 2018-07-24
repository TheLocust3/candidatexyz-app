import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import SignUpForm from '../../../components/communication/sign-ups/SignUpForm';

class CreateSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Ups'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Sign Up</Text>
                <br /><br />

                <div className='content-2'>
                    <SignUpForm />
                </div>
                <br />

                <BackLink to='/communication/sign-ups/' />
            </div>
        );
    }
}

export default connect()(CreateSignUp);
