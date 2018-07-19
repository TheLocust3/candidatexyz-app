import React from 'react';
import { connect } from 'react-redux';
import { ContactActions, ContactApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
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
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href={`${ContactApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
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
