import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class FinanceOverview extends React.Component {

    renderSmall() {
        return (
            <div>
                <Text type='body1'>Current Balance</Text>
                <Text type='body2'>${_.round(_.sumBy(this.props.receipts, (receipt) => { return receipt.amount }) - _.sumBy(this.props.expenditures, (expenditure) => { return expenditure.amount }), 2)}</Text>
                <br />

                <Text type='body1'>Total Donations</Text>
                <Text type='body2'>${_.sumBy(this.props.receipts, (receipt) => { return receipt.amount })}</Text>
            </div>
        );
    }

    render() {
        if (this.props.small) {
            return this.renderSmall();
        }

        return (
            <div>
                <Text type='subtitle1'>Current Balance</Text>
                <Text className='content-1' type='body2'>${_.round(_.sumBy(this.props.receipts, (receipt) => { return receipt.amount }) - _.sumBy(this.props.expenditures, (expenditure) => { return expenditure.amount }), 2)}</Text>
                <br /><br />
                
                <Text type='subtitle1'>Total Finances</Text>
                <br />

                <div className='content-1'>
                    <Text type='body1'>Donations</Text>
                    <Text type='body2'>${_.sumBy(this.props.receipts, (receipt) => { return receipt.amount })}</Text>
                    <br />

                    <Text type='body1'>Expenses</Text>
                    <Text type='body2'>${_.sumBy(this.props.expenditures, (expenditure) => { return expenditure.amount })}</Text>
                    <br />

                    <Text type='body1'>In Kind Donations</Text>
                    <Text type='body2'>${_.sumBy(this.props.inKinds, (inKind) => { return inKind.value })}</Text>
                    <br />

                    <Text type='body1'>Liabilities</Text>
                    <Text type='body2'>${_.sumBy(this.props.liabilities, (liability) => { return liability.amount })}</Text>
                </div>
            </div>
        )
    }
}

FinanceOverview.propTypes = {
    receipts: PropTypes.array.isRequired,
    expenditures: PropTypes.array.isRequired,
    inKinds: PropTypes.array.isRequired,
    liabilities: PropTypes.array.isRequired,
    small: PropTypes.bool
};
