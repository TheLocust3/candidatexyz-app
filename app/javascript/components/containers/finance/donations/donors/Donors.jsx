import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DonorActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../../actions/global-actions';

import Loader from '../../../../components/common/Loader';
import Table from '../../../../components/common/Table';
import BackLink from '../../../../components/common/BackLink';

const PER_PAGE = 20;

class Donors extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Donors'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(DonorActions.fetchAllDonors());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Donor List</Text>
                <div className='resource-actions-under'>
                    <Link className='resource-actions-item unstyled-link-black' to='/communication/mail/donors'>
                        <Text type='body2'>
                            Email
                        </Text>
                    </Link>
                </div>
                <br /><br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/finance/donors/' toId='name' headers={['Name', 'Total Amount', 'Address', 'City', 'State']} keys={['name', (receipt) => { return `$${receipt.amount}` }, 'address', 'city', 'state']} rows={this.props.donors.donors} rowsPerPage={PER_PAGE} pagerLink='/finance/donors' />
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
        isReady: state.donors.isReady,
        donors: state.donors.donors
    };
}

export default connect(mapStateToProps)(Donors);
