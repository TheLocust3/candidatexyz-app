import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ExpenditureActions, ExpenditureApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

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
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/expenditures/create'>
                        <Text type='body2'>Add</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${ExpenditureApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/expenditures/' headers={['Paid To', 'Amount', 'Date Paid', 'Address']} keys={['paidTo', 'amountString', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} sortingKeys={['paidTo', 'amount', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} rows={this.props.expenditures.expenditures} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={this.props.expenditures.expenditures} elementsPerPage={PER_PAGE} baseLink='/finance/expenditures' />
                    </Loader>
                </div>
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
