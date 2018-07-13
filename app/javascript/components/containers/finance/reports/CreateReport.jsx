import React from 'react';
import { connect } from 'react-redux';
import { ReportActions } from 'candidatexyz-common-js';
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
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Report</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <ReportForm reportTypes={this.props.reportTypes} />
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
        reportTypes: state.reports.reportTypes
    };
}

export default connect(mapStateToProps)(CreateReport);
