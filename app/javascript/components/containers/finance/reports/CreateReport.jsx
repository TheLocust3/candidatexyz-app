import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { ReportActions, CampaignActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import ReportForm from '../../../components/finance/reports/ReportForm';

class CreateReport extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Add Report'));
        this.props.dispatch(setBreadcrumb('Reports'));
        this.props.dispatch(setDrawerSelected('finance', 'reports'));

        this.props.dispatch(ReportActions.fetchReportTypes());
        this.props.dispatch(ReportActions.fetchAllReports());
        this.props.dispatch(CampaignActions.fetchCampaign(this.props.user.campaignId));
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Report</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.areReportTypesReady && this.props.isReady && !_.isEmpty(this.props.reportTypes) && this.props.isCampaignReady}>
                        <ReportForm reportTypes={this.props.reportTypes} reports={this.props.reports.reports} campaign={this.props.campaign} />
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
        campaign: state.campaigns.campaign
    };
}

export default connect(mapStateToProps)(CreateReport);
