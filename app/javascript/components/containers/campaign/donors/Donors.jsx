import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { DonorActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

class Donors extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donors'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('campaign', 'donors'));

        this.props.dispatch(DonorActions.fetchAllDonors());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Donor List</Text>
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/campaign/donors/create'>
                        <Text type='body2'>Create</Text>
                    </Link>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/campaign/donors/' headers={['Name', 'Amount', 'Date Received', 'Address', 'City', 'State']} keys={['name', 'amountString', (row) => { return moment(row.dateReceived).format('MM/DD/YYYY') }, 'address', 'city', 'state']} rows={this.props.donors.donors} rowsPerPage={PER_PAGE} />
                        <br /><br />

                        <Pager elements={this.props.donors.donors} elementsPerPage={PER_PAGE} baseLink='/campaign/donors' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.donors.isReady,
        donors: state.donors.donors
    };
}

export default connect(mapStateToProps)(Donors);
