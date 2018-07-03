import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CampaignActions, AnalyticEntryActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';
import { websiteLink } from '../../helpers';

import Loader from '../components/common/Loader';
import Text from '../components/common/Text';
import AnalyticsOverview from '../components/website/AnalyticsOverview';
import AnalyticsGraphs from '../components/website/AnalyticsGraphs';

class Website extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Website'));
        this.props.dispatch(setBreadcrumb('Website'));
        this.props.dispatch(setDrawerSelected('website'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.currentUser.campaignId));
        this.props.dispatch(AnalyticEntryActions.fetchAggregatedAnalyticEntries(moment().subtract(99, 'years').format(), moment().format(), 'year'));
        this.props.dispatch(AnalyticEntryActions.fetchAggregatedAnalyticEntries(moment().subtract(31, 'days').format(), moment().format(), 'day'));
        this.props.dispatch(AnalyticEntryActions.fetchAggregatedAnalyticEntries(moment().subtract(24, 'hours').format(), moment().format(), 'hour'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Website Analytics</Text>
                <br />

                <a className='link' href={websiteLink(this.props.campaign.url)}><Text type='body2'>Website</Text></a>
                <br /><br />

                <div className='content-2'>
                    <Text type='headline6'>At a Glance</Text>

                    <Loader isReady={this.props.isCampaignReady && this.props.isAggregateReady.year && this.props.isAggregateReady.day && this.props.isAggregateReady.hour}>
                        <AnalyticsOverview analyticEntries={this.props.aggregateEntries} />
                        <br /><br />

                        <AnalyticsGraphs analyticEntries={this.props.aggregateEntries} />
                    </Loader>
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
        aggregateEntries: state.analyticEntries.aggregateEntries
    };
}

export default connect(mapStateToProps)(Website);
