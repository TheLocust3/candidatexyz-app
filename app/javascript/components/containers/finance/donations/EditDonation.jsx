import React from 'react';
import { connect } from 'react-redux';
import { ReceiptActions, ReceiptApi, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import DonationForm from '../../../components/finance/donations/DonationForm';

class EditDonation extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Donation'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchReceipt(this.props.match.params.id));
        this.props.dispatch(ReceiptActions.fetchAllReceipts());
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;
        
        ReceiptApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/donations');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Donation</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <DonationForm receipt={this.props.receipt} receipts={DonorHelper.generateDonors(this.props.receipts.receipts)} receiptType='donation' />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/finance/donations/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.receipts.isReady,
        receipt: state.receipts.receipt,
        receipts: state.receipts.receipts
    };
}

export default connect(mapStateToProps)(EditDonation);
