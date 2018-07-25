import React from 'react';
import { connect } from 'react-redux';
import { StaffActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerDisabled } from '../../actions/global-actions';

class CompleteSetup extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Complete Setup'));
        this.props.dispatch(setBreadcrumb('Setup'));

        this.props.dispatch(StaffActions.fetchStaffPositions());

        this.interval = setInterval(() => this.refresh(), 3000);
    }

    componentWillUnmount() {
        this.props.dispatch(setDrawerDisabled(false));
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>You've finished setting up</Text>
                <br />

                <Text type='subtitle1'>Refreshing in three seconds</Text>
            </div>
        );
    }

    refresh() {
        window.location.href = '/';
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        positions: state.users.positions,
        isCurrentUserReady: state.users.isCurrentUserReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(CompleteSetup);
