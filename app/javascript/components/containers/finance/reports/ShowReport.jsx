import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReportActions, ReportApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Report from '../../../components/finance/reports/Report';

class ShowReport extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Report'));
        this.props.dispatch(setBreadcrumb('Reports'));
        this.props.dispatch(setDrawerSelected('finance', 'reports'));

        this.props.dispatch(ReportActions.fetchReport(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ReportApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/reports');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Report</Text>

                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady && !_.isEmpty(this.props.report)}>
                        <Report report={this.props.report} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/reports' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.reports.isReady,
        report: state.reports.report
    };
}

export default connect(mapStateToProps)(ShowReport);
