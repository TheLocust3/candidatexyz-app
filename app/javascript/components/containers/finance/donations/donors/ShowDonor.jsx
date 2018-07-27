import React from 'react';
import { connect } from 'react-redux';
import { DonorActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../../actions/global-actions';

import Loader from '../../../../components/common/Loader';
import BackLink from '../../../../components/common/BackLink';
import Donor from '../../../../components/finance/donations/donors/Donor';

class ShowDonor extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Donor'));
        this.props.dispatch(setBreadcrumb('Donors'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(DonorActions.fetchDonor(this.props.match.params.name));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>{this.props.donor.name}</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Donor donor={this.props.donor} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/donors' />
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
