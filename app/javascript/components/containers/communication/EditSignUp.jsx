import React from 'react';
import { connect } from 'react-redux';
import { ContactActions, ContactApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import SignUpForm from '../../components/communication/SignUpForm';

class EditSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));

        this.props.dispatch(ContactActions.fetchContact(this.props.match.params.id));
    }

    onDeleteClick(event) {
        ContactApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/sign-ups');
        });
    }

    renderSignUpForm() {
        if (!this.props.isReady) return;

        return <SignUpForm contact={this.props.contact} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Sign Up</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    {this.renderSignUpForm()}
                </div>
                <br />

                <BackLink to={`/communication/sign-ups/${this.props.match.params.id}`} />
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

export default connect(mapStateToProps)(EditSignUp);
