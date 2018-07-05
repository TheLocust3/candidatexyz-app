import React from 'react';
import { connect } from 'react-redux';
import { ContactActions, ContactApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import SignUpForm from '../../../components/communication/sign-ups/SignUpForm';

class EditSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));

        this.props.dispatch(ContactActions.fetchContact(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ContactApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/sign-ups');
        });
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
                    <Loader isReady={this.props.isReady}>
                        <SignUpForm contact={this.props.contact} />
                    </Loader>
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
