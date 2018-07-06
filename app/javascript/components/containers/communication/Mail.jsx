import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, ContactActions } from 'candidatexyz-common-js';
import { Text, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import MailForm from '../../components/communication/MailForm';

const GROUPS = [{ key: '', value: '' }, { key: 'signUps', value: 'All Sign Ups' }, { key: 'volunteers', value: 'All Volunteers' }];

class Mail extends React.Component {

    constructor(props) {
        super(props);

        this.state = { group: '', shouldSend: false, emails: [], pullingResource: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Send Mail'));
        this.props.dispatch(setBreadcrumb('Mail'));
        this.props.dispatch(setDrawerSelected('communication', 'mail'));
    }

    componentWillReceiveProps(nextProps) {
        if (!(nextProps.areContactsReady || nextProps.areVolunteersReady) || !this.state.pullingResource) return;

        let emails = [];
        if (this.state.group == 'signUps') {
            emails = nextProps.contacts.contacts.map((contact) => {
                return { id: contact.id, email: contact.email, type: 'contact', firstName: contact.firstName, lastName: contact.lastName }
            });
        } else if (this.state.group == 'volunteers') {
            emails = nextProps.volunteers.volunteers.map((volunteer) => {
                return { id: volunteer.id, email: volunteer.email, type: 'volunteer', firstName: volunteer.firstName, lastName: volunteer.lastName }
            });
        }

        this.setState({
            emails: emails,
            shouldSend: true
        });
    }

    handleGroupChange(select) {
        let groupKey = _.find(GROUPS, (group) => { return group.value == select.value }).key;

        this.setState({
            group: groupKey
        });
    }
    
    beforeSend() {
        if (this.state.group == 'signUps') {
            this.props.dispatch(ContactActions.fetchAllContacts());
        } else if (this.state.group == 'volunteers') {
            this.props.dispatch(VolunteerActions.fetchAllVolunteers());
        }

        this.setState({
            pullingResource: true
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Send Email</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={(this.props.areVolunteersReady && this.props.areContactsReady) || (!this.state.send)}>
                        <Select label='Send To' selectedIndex={_.findIndex(GROUPS, (group) => { return group.key == this.state.group })} onChange={(select) => this.handleGroupChange(select)} style={{ width: '30%' }}>
                            {_.map(GROUPS, (group) => {
                                return (
                                    <SelectItem key={group.key}>
                                        {group.value}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    </Loader>

                    <div style={{ visibility: this.state.shouldSend ? 'hidden' : 'visible' }}>
                        <MailForm beforeSend={() => this.beforeSend()} emails={this.state.emails} shouldSend={this.state.shouldSend} />
                    </div>
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
        contacts: state.contacts.contacts
    };
}

export default connect(mapStateToProps)(Mail);
