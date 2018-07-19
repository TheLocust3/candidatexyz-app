import React from 'react';
import { connect } from 'react-redux';
import { UserActions } from 'candidatexyz-common-js';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import StaffSignUpForm from '../../components/campaign/StaffSignUpForm';

class StaffSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('campaign', 'staffSignUp'));

        this.props.dispatch(UserActions.fetchInvitedUser(this.props.match.params.token))
    }

    render() {
        return (
            <div className='fullpage relative'>
                <div className='sign-up-box center'>
                    <Text type='headline5'>Staff Sign Up</Text>
                    <br />

                    <div className='content-2'>
                        <Loader isReady={this.props.isReady}>
                            <StaffSignUpForm token={this.props.match.params.token} user={this.props.user} />
                        </Loader>
                    </div>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        user: state.users.user
    };
}

export default connect(mapStateToProps)(StaffSignUp);
