import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, ContactActions, MessageActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import VolunteersOverview from '../../components/communication/VolunteersOverview';
import SignUpsOverview from '../../components/communication/SignUpsOverview';
import MessagesOverview from '../../components/communication/MessagesOverview';

class Communication extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Communication'));
        this.props.dispatch(setBreadcrumb('Communication'));
        this.props.dispatch(setDrawerSelected('communication'));

        this.props.dispatch(VolunteerActions.fetchAllVolunteers());
        this.props.dispatch(ContactActions.fetchAllContacts());
        this.props.dispatch(MessageActions.fetchAllMessages());
    }

    render() {
        if (!this.props.areVolunteersReady || !this.props.areContactsReady || !this.props.areMessagesReady) return null;

        return (
            <div className='content'>
                <Text type='headline5'>Communication Overview</Text>
                <br />

                <div className='content-2'>
                    <Text type='headline6'>Volunteers</Text>

                    <VolunteersOverview volunteers={this.props.volunteers.volunteers} />
                    <br /><br />

                    <Text type='headline6'>Sign Ups</Text>

                    <SignUpsOverview contacts={this.props.contacts.contacts} />
                    <br /><br />

                    <Text type='headline6'>Messages</Text>

                    <MessagesOverview messages={this.props.messages.messages} />
                </div>
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
        areMessagesReady: state.messages.isReady,
        messages: state.messages.messages
    };
}

export default connect(mapStateToProps)(Communication);
