import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReportActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import ReportList from '../../../components/finance/reports/ReportList';

const PER_PAGE = 10;

class Reports extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Reports'));
        this.props.dispatch(setBreadcrumb('Reports'));
        this.props.dispatch(setDrawerSelected('finance', 'reports'));

        this.props.dispatch(ReportActions.fetchAllReports());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Reports List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/reports/create'>
                        <Text type='body2'>Add</Text>
                    </Link>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <ReportList reports={this.props.reports.reports} />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.reports.isReady,
        reports: state.reports.reports
    };
}

export default connect(mapStateToProps)(Reports);
