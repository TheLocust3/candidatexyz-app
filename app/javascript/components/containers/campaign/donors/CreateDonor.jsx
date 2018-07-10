import React from 'react';
import { connect } from 'react-redux';
import { DonorActions, DonorApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import DonorForm from '../../../components/campaign/donors/DonorForm';

class EditDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Donor'));
        this.props.dispatch(setBreadcrumb('Donor'));
        this.props.dispatch(setDrawerSelected('campaign', 'donors'));
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Create Donor</Text>
                <br />

                <div className='content-2'>
                    <DonorForm />
                </div>
                <br />

                <BackLink to='/campaign/donors/' />
            </div>
        );
    }
}

export default connect()(EditDonor);
