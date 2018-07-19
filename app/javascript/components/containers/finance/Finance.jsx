import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReceiptActions, ExpenditureActions, InKindActions, LiabilityActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import FinanceOverview from '../../components/finance/FinanceOverview';

class Finance extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Finance'));
        this.props.dispatch(setBreadcrumb('Finance'));
        this.props.dispatch(setDrawerSelected('finance'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
        this.props.dispatch(ExpenditureActions.fetchAllExpenditures());
        this.props.dispatch(InKindActions.fetchAllInKinds());
        this.props.dispatch(LiabilityActions.fetchAllLiabilities());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Finance Overview</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/donations/new'>
                        <Text type='body2'>Add Donation</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <Link className='resource-actions-item unstyled-link-black' to='/finance/expenditures/new'>
                        <Text type='body2'>Add Expense</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <Link className='resource-actions-item unstyled-link-black' to='/finance/liabilities/new'>
                        <Text type='body2'>Add Debt</Text>
                    </Link>
                </div>
                <br />

                <Loader isReady={this.props.areReceiptsReady && this.props.areExpendituresReady && this.props.areInKindsReady && this.props.areLiabilitiesReady}>
                    <FinanceOverview receipts={this.props.receipts.receipts} expenditures={this.props.expenditures.expenditures} inKinds={this.props.inKinds.inKinds} liabilities={this.props.liabilities.liabilities} />
                </Loader>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        areReceiptsReady: state.receipts.isReady,
        receipts: state.receipts.receipts,
        areExpendituresReady: state.expenditures.isReady,
        expenditures: state.expenditures.expenditures,
        areInKindsReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds,
        areLiabilitiesReady: state.liabilities.isReady,
        liabilities: state.liabilities.liabilities
    };
}

export default connect(mapStateToProps)(Finance);
