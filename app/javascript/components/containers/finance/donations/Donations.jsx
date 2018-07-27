import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReceiptApi, InKindApi, DonationActions } from 'candidatexyz-common-js';
import { Text, Fab, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Table from '../../../components/common/Table';

const PER_PAGE = 20;

class Donations extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donations'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(DonationActions.fetchAllDonations());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Donation List</Text>
                <div className='resource-actions-under'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donors'>
                        <Text type='body2'>Donor List</Text>
                    </Link>

                    <a className='resource-actions-item unstyled-link-black' href={`${ReceiptApi.exportLink()}`} download>
                        <Text type='body2'>Download Receipts</Text>
                    </a>

                    <a className='resource-actions-item unstyled-link-black' href={`${InKindApi.exportLink()}`} download>
                        <Text type='body2'>Download In Kinds</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to={(row) => { return row.type == 'Receipt' ? '/finance/donations/' : '/finance/in-kinds/' }} headers={['Name', 'Amount', 'Address', 'Date Received', 'Type']} keys={['name', 'amountString', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, 'type']} sortingKeys={['name', 'amount', (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }, (row) => { return moment(row.dateReceived).unix() }, 'type']} rows={this.props.donations.donations} rowsPerPage={PER_PAGE} pagerLink='/finance/donations' />
                    </Loader>
                </div>

                <Link className='add-fab-link unstyled-link' to='/finance/donations/new'>
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
        areReceiptsReady: state.receipts.isReady,
        receipts: state.receipts.receipts,
        areInKindsReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds,
        isReady: state.donations.isReady,
        donations: state.donations.donations
    };
}

export default connect(mapStateToProps)(Donations);
