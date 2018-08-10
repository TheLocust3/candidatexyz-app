import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ReportActions, CampaignActions, CommitteeActions, ReportApi, ReportHelper } from 'candidatexyz-common-js';
import { Text, Button } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';
import { history } from '../../../../constants';

import Loader from '../../../components/common/Loader';

class DissolveCommittee extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isTimedOut: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Dissolve Committee'));
        this.props.dispatch(setBreadcrumb('Committee'));
        this.props.dispatch(setDrawerSelected('campaign', 'committee'));

        this.props.dispatch(CampaignActions.fetchCampaign(this.props.user.campaignId));
        this.props.dispatch(ReportActions.fetchReportTypes());
        this.props.dispatch(ReportActions.fetchAllReports());
        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
    }

    onGenerateReport() {
        let reportTypes = _.filter(this.props.reportTypes[_.toLower(this.props.campaign.state)], (reportType) => { return reportType.officeType == this.props.campaign.officeType });
        let reportType = _.filter(reportTypes, (type) => { return type.name == 'Dissolution' })[0];

        let lastReport = ReportHelper.lastOfficialReport(this.props.reports.reports, 'finance');
        let beginningDate = null;
        if (_.isEmpty(lastReport)) {
            lastReport = ReportHelper.lastOfficialReport(this.props.reports.reports, 'committee');
            beginningDate = lastReport.createdAt;
        } else {
            beginningDate = lastReport.data.beginning_date;
        }

        ReportApi.create(reportType.value, true, 'committee', { committee_id: this.props.committee.id, beginning_date: moment(beginningDate).format(), ending_date: moment().format() }).then((response) => {
            history.push(`/finance/reports/${response.id}`);
        })
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Dissolve Committee</Text>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady && this.props.areReportTypesReady && this.props.isCampaignReady && this.props.areReportsReady}>
                        <Text type='body1'>
                            To dissolve your committee, must generate a Dissolution Report.<br />
                            This is a normal Campaign Finance report that records your final finances.
                        </Text>
                        <br /><br />

                        <Button onClick={this.onGenerateReport.bind(this)}>Generate Report</Button>
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.committees.isReady,
        committee: state.committees.committee,
        areReportsReady: state.reports.isReady,
        reports: state.reports.reports,
        areReportTypesReady: state.reports.areReportTypesReady,
        reportTypes: state.reports.reportTypes,
        isCampaignReady: state.campaigns.isReady,
        campaign: state.campaigns.campaign,
        user: state.users.currentUser,
    };
}

export default connect(mapStateToProps)(DissolveCommittee);
