import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LiabilityActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

class Liabilities extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Liabilities'));
        this.props.dispatch(setBreadcrumb('Liabilities'));
        this.props.dispatch(setDrawerSelected('finance', 'liabilities'));

        this.props.dispatch(LiabilityActions.fetchAllLiabilities());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Liabilities List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/finance/liabilities/create'>
                        <Text type='body2'>Add</Text>
                    </Link>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/liabilities/' headers={['To Whom', 'Amount', 'Date Incurred', 'Address']} keys={['toWhom', 'amountString', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} sortingKeys={['toWhom', 'amount', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, (row) => { return `${row.address}, ${row.city}, ${row.state}, ${row.country}` }]} rows={this.props.liabilities.liabilities} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={this.props.liabilities.liabilities} elementsPerPage={PER_PAGE} baseLink='/finance/liabilities' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.liabilities.isReady,
        liabilities: state.liabilities.liabilities
    };
}

export default connect(mapStateToProps)(Liabilities);
