import React from 'react';
import { connect } from 'react-redux';
import { ReceiptActions, ReceiptApi, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import DonationForm from '../../../components/finance/donations/DonationForm';

class CreateDonation extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Donation'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donation'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Donation</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        {/* Generate donors (below) so autocomplete completes the fullest one possible (with email and stuff) */}
                        <DonationForm receipts={DonorHelper.generateDonors(this.props.receipts.receipts)} receiptType='donation' />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/donations/' />
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

export default connect(mapStateToProps)(CreateDonation);
