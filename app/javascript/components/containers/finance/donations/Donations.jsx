import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReceiptActions, ReceiptApi, InKindActions, InKindApi, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Table from '../../../components/common/Table';

const PER_PAGE = 20;

class Donations extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donations'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
        this.props.dispatch(InKindActions.fetchAllInKinds());
    }

    render() {
        let donations = DonorHelper.mergeDonations(this.props.receipts.receipts, this.props.inKinds.inKinds);

        return (
            <div className='content'>
                <Text type='headline5'>Donation List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donations/new'>
                        <Text type='body2'>Add</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donors'>
                        <Text type='body2'>Donor List</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${ReceiptApi.exportLink()}`} download>
                        <Text type='body2'>Download Receipts</Text>
                    </a>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href={`${InKindApi.exportLink()}`} download>
                        <Text type='body2'>Download In Kinds</Text>
                    </a>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.areReceiptsReady && this.props.areInKindsReady}>
                        <Table to={(row) => { return row.type == 'Receipt' ? '/finance/donations/' : '/finance/in-kinds/' }} headers={['Name', 'Amount', 'Address', 'Date Received', 'Type']} keys={['name', 'amountString', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, 'type']} sortingKeys={['name', 'amount', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).unix() }, 'type']} rows={donations} rowsPerPage={PER_PAGE} pagerLink='/finance/donations' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        areReceiptsReady: state.receipts.isReady,
        receipts: state.receipts.receipts,
        areInKindsReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(Donations);
