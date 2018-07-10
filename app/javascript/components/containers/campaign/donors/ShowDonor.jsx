import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DonorActions, DonorApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Donor from '../../../components/campaign/donors/Donor';

class ShowDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Donor'));
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
                <Text type='headline5'>View Donor</Text>

                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/campaign/donors/${this.props.match.params.id}/edit`}>
                        <Text type='body2'>Edit</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Donor donor={this.props.donor} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/campaign/donors' />
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

export default connect(mapStateToProps)(ShowDonor);
