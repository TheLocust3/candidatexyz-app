import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReceiptActions, InKindActions, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../../actions/global-actions';

import Loader from '../../../../components/common/Loader';
import Pager from '../../../../components/common/Pager';
import Table from '../../../../components/common/Table';
import BackLink from '../../../../components/common/BackLink';

const PER_PAGE = 10;

class Donors extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donors'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
        this.props.dispatch(InKindActions.fetchAllInKinds());
    }

    render() {
        let donors = DonorHelper.generateDonorsInYear(DonorHelper.mergeDonations(this.props.receipts.receipts, this.props.inKinds.inKinds));

        return (
            <div className='content'>
                <Text type='headline5'>Donor List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/communication/mail/donors'>
                        <Text type='body2'>
                            Email
                        </Text>
                    </Link>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.areReceiptsReady && this.props.areInKindsReady}>
                        <Table to='/finance/donors/' toId='name' headers={['Name', 'Total Amount', 'Address', 'City', 'State']} keys={['name', (receipt) => { return `$${receipt.amount}` }, 'address', 'city', 'state']} rows={donors} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={donors} elementsPerPage={PER_PAGE} baseLink='/finance/donors' />
                        <br />
                        
                        <BackLink to='/finance/donations' />
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

export default connect(mapStateToProps)(Donors);
