import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ExpenditureActions, ExpenditureApi } from 'candidatexyz-common-js';
import { Text, Fab, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Table from '../../../components/common/Table';

const PER_PAGE = 20;

class Expenditures extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Expenses'));
        this.props.dispatch(setBreadcrumb('Expenses'));
        this.props.dispatch(setDrawerSelected('finance', 'expenditures'));

        this.props.dispatch(ExpenditureActions.fetchAllExpenditures());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Expenses List</Text>
                <div className='resource-actions-under'>
                    <a className='resource-actions-item unstyled-link-black' href={`${ExpenditureApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/expenditures/' headers={['Paid To', 'Amount', 'Address', 'Date Paid']} keys={['paidTo', 'amountString', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.datePaid).format('MM/DD/YYYY') }]} sortingKeys={['paidTo', 'amount', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.datePaid).unix() }]} rows={this.props.expenditures.expenditures} rowsPerPage={PER_PAGE} pagerLink='/finance/expenditures' />
                    </Loader>
                </div>

                <Link className='add-fab-link unstyled-link' to='/finance/expenditures/new'>
                    <Fab className='add-fab'>
                        <i className='material-icons'>add</i>
                    </Fab>
                </Link>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.expenditures.isReady,
        expenditures: state.expenditures.expenditures
    };
}

export default connect(mapStateToProps)(Expenditures);
