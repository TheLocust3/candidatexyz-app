import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, ContactActions, ReceiptActions, DonorHelper } from 'candidatexyz-common-js';
import { Text, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import MailForm from '../../components/communication/MailForm';

const GROUPS = [{ key: '', value: '' }, { key: 'signUps', value: 'All Sign Ups' }, { key: 'volunteers', value: 'All Volunteers' }, { key: 'donors', value: 'All Donors' }];

class Mail extends React.Component {

    constructor(props) {
        super(props);

        this.state = { group: this.props.match.params.group, shouldSend: false, emails: [], pullingResource: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Send Mail'));
        this.props.dispatch(setBreadcrumb('Mail'));

        let subItem = '';
        if (this.state.group == 'sign-ups') {
            this.props.dispatch(ContactActions.fetchAllContacts());
            subItem = 'signUps';
        } else if (this.state.group == 'volunteers') {
            this.props.dispatch(VolunteerActions.fetchAllVolunteers());
            subItem = 'volunteers';
        } else if (this.state.group == 'donors') {
            this.props.dispatch(ReceiptActions.fetchAllReceipts());
            subItem = 'donations';
        }

        this.props.dispatch(setDrawerSelected('communication', subItem));
    }
    
    beforeSend() {
        let emails = [];
        if (this.state.group == 'sign-ups') {
            emails = this.props.contacts.contacts.map((contact) => {
                return { id: contact.id, email: contact.email, type: 'contact', firstName: contact.firstName, lastName: contact.lastName }
            });
        } else if (this.state.group == 'volunteers') {
            emails = this.props.volunteers.volunteers.map((volunteer) => {
                return { id: volunteer.id, email: volunteer.email, type: 'volunteer', firstName: volunteer.firstName, lastName: volunteer.lastName }
            });
        } else if (this.state.group == 'donors') {
            emails = _.filter(DonorHelper.generateDonors(this.props.receipts.receipts), (donor) => { return donor.receiptType == 'donation' }).map((donor) => {
                return { id: donor.id, email: donor.email, type: 'donor', firstName: donor.name, lastName: '' }
            });
        }

        this.setState({
            emails: emails,
            shouldSend: true
        });
    }

    renderGroup() {
        if (this.state.group == 'volunteers') {
            return 'Volunteers';
        } else if (this.state.group == 'sign-ups') {
            return 'Sign Ups'
        } else if (this.state.group == 'donors') {
            return 'Donors'
        }
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Send Email</Text>
                <br />

                <div className='content-2'>
                    <Text type='body1'>To: {this.renderGroup()}</Text>
                    
                    <Loader isReady={(this.props.areVolunteersReady && this.props.areContactsReady && this.props.areReceiptsReady) || (!this.state.send)}>
                        <MailForm beforeSend={() => this.beforeSend()} emails={this.state.emails} shouldSend={this.state.shouldSend} />
                    </Loader>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        areVolunteersReady: state.volunteers.isReady,
        volunteers: state.volunteers.volunteers,
        areContactsReady: state.contacts.isReady,
        contacts: state.contacts.contacts,
        areReceiptsReady: state.receipts.isReady,
        receipts: state.receipts.receipts
    };
}

export default connect(mapStateToProps)(Mail);
