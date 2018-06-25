import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContactActions, ContactApi } from 'candidatexyz-common-js';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Text from '../../../components/common/Text';
import BackLink from '../../../components/common/BackLink';
import SignUp from '../../../components/communication/sign-ups/SignUp';

class ShowSignUp extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Sign Up'));
        this.props.dispatch(setBreadcrumb('Sign Up'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'));

        this.props.dispatch(ContactActions.fetchContact(this.props.match.params.id));
    }

    onDeleteClick(event) {
        ContactApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/sign-ups');
        });
    }

    renderSignUp() {
        if (!this.props.isReady) return;

        return <SignUp contact={this.props.contact} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Sign Up</Text>

                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/communication/sign-ups/${this.props.match.params.id}/edit`}>
                        <Text type='body2'>Edit</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
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
