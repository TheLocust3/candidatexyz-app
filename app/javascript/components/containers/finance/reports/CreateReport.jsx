import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ReportActions, CampaignActions, UserActions, CommitteeActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import ReportForm from '../../../components/finance/reports/ReportForm';
import ReportChecklist from '../../../components/finance/reports/ReportChecklist';

class CreateReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = { checklistComplete: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Add Report'));
        this.props.dispatch(setBreadcrumb('Reports'));
        this.props.dispatch(setDrawerSelected('finance', 'reports'));

        this.props.dispatch(ReportActions.fetchReportTypes());
        this.props.dispatch(ReportActions.fetchAllReports());
        this.props.dispatch(CampaignActions.fetchCampaign(this.props.user.campaignId));
        this.props.dispatch(UserActions.fetchAllUsersWithPositions());
        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
    }

    renderReportForm() {
        if (this.state.checklistComplete) {
            return (
                <div>
                    <Text type='headline6'>
                        Generate Report
                    </Text>

                    <ReportForm reportTypes={this.props.reportTypes} reports={this.props.reports.reports} campaign={this.props.campaign} />
                </div>
            );
        } else {
            return (
                <Text type='body1'>
                    Before generating a campaign finance report, you must complete the above checklist
                </Text>
            );
        }
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Report</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.areReportTypesReady && this.props.isReady && !_.isEmpty(this.props.reportTypes) && this.props.isCampaignReady}>
                        <ReportChecklist users={this.props.users.users} committee={this.props.committee} complete={() => { this.setState({ checklistComplete: true }) }} />
                        <br /><br />
                        
                        {this.renderReportForm()}
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/reports/' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.reports.isReady,
        areReportTypesReady: state.reports.areReportTypesReady,
        reportTypes: state.reports.reportTypes,
        reports: state.reports.reports,
        user: state.users.currentUser,
        isCampaignReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign,
        areUsersReady: state.users.isReady,
        users: state.users.users,
        isCommitteeReady: state.committees.isReady,
        committee: state.committees.committee
    };
}

export default connect(mapStateToProps)(CreateReport);
