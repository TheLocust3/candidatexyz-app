import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, ContactActions, MailApi } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';
import { history } from '../../../constants';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import Text from '../../components/common/Text';
import Select from '../../components/common/Select';
import SelectItem from '../../components/common/SelectItem';
import MailForm from '../../components/communication/MailForm';

const GROUPS = [{ key: '', value: '' }, { key: 'signUps', value: 'All Sign Ups' }, { key: 'volunteers', value: 'All Volunteers' }];

class Mail extends React.Component {

    constructor(props) {
        super(props);

        this.state = { group: '', send: false, mail: null };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Send Mail'));
        this.props.dispatch(setBreadcrumb('Mail'));
        this.props.dispatch(setDrawerSelected('communication', 'mail'));
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.send) return;

        let emails = [];
        if (this.state.group == 'signUps') {
            if (!nextProps.areContactsReady) return;

            emails = nextProps.contacts.contacts.map((contact) => {
                return { id: contact.id, email: contact.email, type: 'contact', firstName: contact.firstName, lastName: contact.lastName }
            });
        } else if (this.state.group == 'volunteers') {
            if (!nextProps.areVolunteersReady) return;

            emails = nextProps.volunteers.volunteers.map((volunteer) => {
                return { id: volunteer.id, email: volunteer.email, type: 'volunteer', firstName: volunteer.firstName, lastName: volunteer.lastName }
            });
        }
        
        emails.map((email) => {
            let subject = this.state.mail.subject.replace(/[FIRST_NAME]/g, email.firstName).replace(/[LAST_NAME]/g, email.lastName);
            let body = this.state.mail.body.replace(/[FIRST_NAME]/g, email.firstName).replace(/[LAST_NAME]/g, email.lastName);

            MailApi.sendEmail(email.email, subject, body, email.type, email.id);
        });

        history.push('/');
    }

    handleGroupChange(select) {
        let groupKey = _.find(GROUPS, (group) => { return group.value == select.value }).key;

        this.setState({
            group: groupKey
        });
    }
    
    sendMail(mail) {
        if (this.state.group == 'signUps') {
            this.props.dispatch(ContactActions.fetchAllContacts());
        } else if (this.state.group == 'volunteers') {
            this.props.dispatch(VolunteerActions.fetchAllVolunteers());
        }

        this.setState({
            send: true,
            mail: mail
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Send Email</Text>
                <br />

                <div className='content-2'>
                    <Select label='Send To' selectedIndex={_.findIndex(GROUPS, (group) => { return group.key == this.state.group })} onChange={(select) => this.handleGroupChange(select)} style={{ width: '30%' }}>
                        {_.map(GROUPS, (group) => {
                            return (
                                <SelectItem key={group.key}>
                                    {group.value}
                                </SelectItem>
                            );
                        })}
                    </Select>

                    <MailForm sendMail={(mail) => this.sendMail(mail)} />
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
