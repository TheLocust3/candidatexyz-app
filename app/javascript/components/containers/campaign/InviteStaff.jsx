import React from 'react';
import { connect } from 'react-redux';
import { StaffActions } from 'candidatexyz-common-js';
import { Text, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import InviteForm from '../../components/campaign/InviteForm';

class InviteStaff extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'inviteStaff'));

        this.props.dispatch(StaffActions.fetchStaffPositions());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Invite Staff Member</Text>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <InviteForm positions={this.props.positions.positions} />
                    </Loader>
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        positions: state.users.positions
    };
}

export default connect(mapStateToProps)(InviteStaff);
