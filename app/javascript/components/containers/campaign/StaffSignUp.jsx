import React from 'react';
import { connect } from 'react-redux';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import StaffSignUpForm from '../../components/campaign/StaffSignUpForm';

class StaffSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('campaign', 'staffSignUp'));
    }

    render() {
        return (
            <div className='fullpage relative'>
                <div className='sign-up-box center'>
                    <Text type='headline5'>Staff Sign Up</Text>
                    <br />

                    <div className='content-2'>
                        <StaffSignUpForm token={this.props.match.params.token} />
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

export default connect()(StaffSignUp);
