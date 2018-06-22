import React from 'react';
import { connect } from 'react-redux';
import { ContactActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import SignUp from '../../components/communication/SignUp';

class ShowSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));

        this.props.dispatch(ContactActions.fetchContact(this.props.match.params.id));
    }

    renderSignUp() {
        if (!this.props.isReady) return;

        return <SignUp contact={this.props.contact} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Sign Up</Text>
                <br /><br />

                <div className='content-2'>
                    {this.renderSignUp()}
                </div>
                <br />

                <BackLink to='/communication/sign-ups' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.contacts.isReady,
        contact: state.contacts.contact
    };
}

export default connect(mapStateToProps)(ShowSignUp);
