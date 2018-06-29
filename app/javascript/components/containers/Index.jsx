import React from 'react';
import { connect } from 'react-redux';
import { StaffActions, AnalyticEntryActions, CampaignActions, VolunteerActions, ContactActions, MessageActions } from 'candidatexyz-common-js';
import moment from 'moment';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';
import { websiteLink } from '../../helpers';

import Text from '../components/common/Text';
import AggregateGraph from '../components/website/AggregateGraph';
import VolunteersOverview from '../components/communication/VolunteersOverview';
import SignUpsOverview from '../components/communication/SignUpsOverview';
import MessagesOverview from '../components/communication/MessagesOverview';
import StaffOverview from '../components/campaign/StaffOverview';

class Index extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
        this.props.dispatch(setBreadcrumb('Home'));
        this.props.dispatch(setDrawerSelected('home'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.currentUser.campaignId));
        this.props.dispatch(AnalyticEntryActions.fetchAggregatedAnalyticEntries(moment().subtract(24, 'hours').format(), moment().format(), 'hour'));
        this.props.dispatch(VolunteerActions.fetchAllVolunteers());
        this.props.dispatch(ContactActions.fetchAllContacts());
        this.props.dispatch(MessageActions.fetchAllMessages());
        this.props.dispatch(StaffActions.fetchAllUsers());
    }

    render() {
        if (!this.props.isCampaignReady || !this.props.isAggregateReady.hour || !this.props.areVolunteersReady || !this.props.areContactsReady || !this.props.areMessagesReady || !this.props.areUsersReady) return null;

        let dayStart = moment().minute(0).second(0).millisecond(0).subtract(24, 'hours');
        let dayEnd = moment().minute(0).second(0).millisecond(0);

        return (
            <div className='content'>
                <Text type='headline5'>{this.props.campaign.name}</Text>
                <br />

                <a className='link' href={websiteLink(this.props.campaign.url)}><Text type='body2'>Website</Text></a>
                <br /><br />

                <div className='content-2'>
                    <Text type='headline6'>Page Hits</Text><br />
                    <AggregateGraph analyticEntries={this.props.aggregateEntries.hour} start={dayStart} end={dayEnd} unit='hour' />
                    <br /><br />

                    <Text type='headline6'>Communication</Text><br />
                    
                    <div className='content-2'>
                        <VolunteersOverview volunteers={this.props.volunteers.volunteers} small />

                        <SignUpsOverview contacts={this.props.contacts.contacts} small />

                        <MessagesOverview messages={this.props.messages.messages} small />
                    </div>
                    <br />

                    <Text type='headline6'>Campaign</Text><br />

                    <div className='content-2'>
                        <StaffOverview users={this.props.users.users} small />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.users.currentUser,
        isCampaignReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign,
        isAggregateReady: state.analyticEntries.isAggregateReady,
        aggregateEntries: state.analyticEntries.aggregateEntries,
        areVolunteersReady: state.volunteers.isReady,
        volunteers: state.volunteers.volunteers,
        areContactsReady: state.contacts.isReady,
        contacts: state.contacts.contacts,
        areMessagesReady: state.messages.isReady,
        messages: state.messages.messages,
        areUsersReady: state.users.isReady,
        users: state.users.users,
    };
}

export default connect(mapStateToProps)(Index);
