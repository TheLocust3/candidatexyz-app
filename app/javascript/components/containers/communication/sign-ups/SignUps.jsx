import React from 'react';
import { connect } from 'react-redux';
import { ContactActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Text from '../../../components/common/Text';
import SignUpList from '../../../components/communication/sign-ups/SignUpList';

class SignUps extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign Ups'));
        this.props.dispatch(setBreadcrumb('Sign Ups'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));

        this.props.dispatch(ContactActions.fetchAllContacts());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Sign Up List</Text>
                <br />

                <Loader isReady={this.props.isReady}>
                    <SignUpList contacts={this.props.contacts.contacts} />
                </Loader>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.contacts.isReady,
        contacts: state.contacts.contacts
    };
}

export default connect(mapStateToProps)(SignUps);
