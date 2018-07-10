import React from 'react';
import { connect } from 'react-redux';
import { DonorActions, DonorApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import DonorForm from '../../../components/campaign/donors/DonorForm';

class EditDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Donor'));
        this.props.dispatch(setBreadcrumb('Donor'));
        this.props.dispatch(setDrawerSelected('campaign', 'donors'));

        this.props.dispatch(DonorActions.fetchDonor(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;
        
        DonorApi.destroy(this.props.match.params.id).then(() => {
            history.push('/campaign/donors');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Donor</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <DonorForm donor={this.props.donor} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/campaign/donors/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.donors.isReady,
        donor: state.donors.donor
    };
}

export default connect(mapStateToProps)(EditDonor);
