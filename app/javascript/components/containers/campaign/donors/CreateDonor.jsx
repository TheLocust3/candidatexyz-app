import React from 'react';
import { connect } from 'react-redux';
import { DonorActions, DonorApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import DonorForm from '../../../components/campaign/donors/DonorForm';

class CreateDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Donor'));
        this.props.dispatch(setBreadcrumb('Donor'));
        this.props.dispatch(setDrawerSelected('campaign', 'donors'));

        this.props.dispatch(DonorActions.fetchAllDonors());
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Create Donor</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <DonorForm donors={this.props.donors.donors} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/campaign/donors/' />
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

export default connect(mapStateToProps)(CreateDonor);
