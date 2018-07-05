import React from 'react';
import { connect } from 'react-redux';
import { UserActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import StaffList from '../../components/campaign/StaffList';

class Staff extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'staff'));

        this.props.dispatch(UserActions.fetchAllUsers());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Staff Overview</Text>
                <br />

                <Loader isReady={this.props.isReady}>
                    <StaffList staff={this.props.staff.users} />
                </Loader>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        staff: state.users.users
    };
}

export default connect(mapStateToProps)(Staff);
