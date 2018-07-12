import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReceiptActions, DonorHelper } from 'candidatexyz-common-js';
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
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Donor List</Text>
                <br /><br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/donors/' headers={['Name', 'Total Amount', 'Address', 'City', 'State']} keys={['name', 'amount', 'address', 'city', 'state']} rows={DonorHelper.generateDonorsInYear(this.props.receipts.receipts)} rowsPerPage={PER_PAGE} />
                        <br />
                        <BackLink to='/finance/donations' />

                        <br /><br />

                        <Pager elements={this.props.receipts.receipts} elementsPerPage={PER_PAGE} baseLink='/finance/donors' />
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

export default connect(mapStateToProps)(Donors);
