import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReceiptActions, ReceiptApi, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../../actions/global-actions';

import Loader from '../../../../components/common/Loader';
import BackLink from '../../../../components/common/BackLink';
import Donor from '../../../../components/finance/donations/donors/Donor';

class ShowDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Donor'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchReceipt(this.props.match.params.id));
        this.props.dispatch(ReceiptActions.fetchAllReceipts());
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ReceiptApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/donors');
        });
    }

    render() {
        if (_.isEmpty(this.props.receipts.receipts) || _.isEmpty(this.props.receipt)) return null;

        return (
            <div className='content'>
                <Text type='headline5'>View Donor</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Donor donor={_.find(DonorHelper.generateDonors(this.props.receipts.receipts), (donor) => { return donor.name == this.props.receipt.name })} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/donors' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.receipts.isReady,
        receipt: state.receipts.receipt,
        receipts: state.receipts.receipts,
    };
}

export default connect(mapStateToProps)(ShowDonor);
