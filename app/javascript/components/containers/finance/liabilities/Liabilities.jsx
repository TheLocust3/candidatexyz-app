import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LiabilityActions, LiabilityApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Table from '../../../components/common/Table';

const PER_PAGE = 20;

class Liabilities extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Liabilities'));
        this.props.dispatch(setBreadcrumb('Debts'));
        this.props.dispatch(setDrawerSelected('finance', 'liabilities'));

        this.props.dispatch(LiabilityActions.fetchAllLiabilities());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Debts List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/liabilities/new'>
                        <Text type='body2'>Add</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${LiabilityApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/liabilities/' headers={['To Whom', 'Amount', 'Address', 'Date Incurred']} keys={['toWhom', 'amountString', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }]} sortingKeys={['toWhom', 'amount', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).unix() }]} rows={this.props.liabilities.liabilities} rowsPerPage={PER_PAGE} pagerLink='/finance/liabilities' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.liabilities.isReady,
        liabilities: state.liabilities.liabilities
    };
}

export default connect(mapStateToProps)(Liabilities);
