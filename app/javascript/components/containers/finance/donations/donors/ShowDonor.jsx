import React from 'react';
import { connect } from 'react-redux';
import { ReceiptActions, InKindActions, DonorHelper } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../../actions/global-actions';

import Loader from '../../../../components/common/Loader';
import BackLink from '../../../../components/common/BackLink';
import Donor from '../../../../components/finance/donations/donors/Donor';

class ShowDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Donor'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
        this.props.dispatch(InKindActions.fetchAllInKinds());
    }

    render() {
        if (_.isEmpty(this.props.receipts.receipts)) return null;

        let donor = _.find(DonorHelper.generateDonors(DonorHelper.mergeDonations(this.props.receipts.receipts, this.props.inKinds.inKinds)), (donor) => { return donor.name == this.props.match.params.name });

        return (
            <div className='content'>
                <Text type='headline5'>{donor.name}</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.areReceiptsReady && this.props.areInKindsReady}>
                        <Donor donor={donor} />
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
        areReceiptsReady: state.receipts.isReady,
        receipts: state.receipts.receipts,
        areInKindsReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(ShowDonor);
