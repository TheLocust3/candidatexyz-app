import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReceiptActions, ReceiptApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

class Donations extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donations'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Donation List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donations/create'>
                        <Text type='body2'>Add</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donors'>
                        <Text type='body2'>Donor List</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${ReceiptApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/donations/' headers={['Name', 'Amount', 'Date Received', 'Address']} keys={['name', 'amountString', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} sortingKeys={['name', 'amount', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} rows={this.props.receipts.receipts} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={this.props.receipts.receipts} elementsPerPage={PER_PAGE} baseLink='/finance/donations' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.receipts.isReady,
        receipts: state.receipts.receipts
    };
}

export default connect(mapStateToProps)(Donations);
