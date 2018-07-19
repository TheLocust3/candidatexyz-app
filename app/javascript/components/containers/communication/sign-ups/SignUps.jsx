import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContactActions, ContactApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

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
                    <Link className='resource-actions-item unstyled-link-black' to='/communication/mail/sign-ups'>
                        <Text type='body2'>
                            Email
                        </Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${ContactApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br />

                <Loader isReady={this.props.isReady}>
                    <Table to='/communication/sign-ups/' headers={['Email', 'First Name', 'Last Name', 'Zipcode']} keys={['email', 'firstName', 'lastName', 'zipcode']} rows={this.props.contacts.contacts} rowsPerPage={PER_PAGE} />
                    <br /><br />

                    <Pager elements={this.props.contacts.contacts} elementsPerPage={PER_PAGE} baseLink='/communication/sign-ups' />
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
