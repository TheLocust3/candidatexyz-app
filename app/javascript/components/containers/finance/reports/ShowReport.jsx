import _ from 'lodash';
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

        this.interval = setInterval(() => this.refresh(), 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ReportApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/reports');
        });
    }
    
    renderDelete() {
        if (this.props.report.reportClass != 'finance') return;

        return (
            <a className='resource-actions-item unstyled-link-black delete' href='#' onClick={this.onDeleteClick.bind(this)}>
                <i className='material-icons middle'>delete</i>
            </a>
        );
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>
                    View Report

                    <span className='resource-actions relative'>
                        <Link className='resource-actions-item unstyled-link-black' to={`/finance/reports/${this.props.match.params.id}/edit`}>
                            <i className='material-icons middle'>edit</i>
                        </Link>

                        {this.renderDelete()}
                    </span>
                </Text>
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

    refresh() {
        if (this.props.report.status != 'done' && !_.includes(_.lowerCase(this.props.report.status), 'error')) {
            this.props.dispatch(ReportActions.fetchReport(this.props.match.params.id));
        } else {
            clearInterval(this.interval);
        }
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.reports.isReady,
        report: state.reports.report
    };
}

export default connect(mapStateToProps)(ShowReport);
