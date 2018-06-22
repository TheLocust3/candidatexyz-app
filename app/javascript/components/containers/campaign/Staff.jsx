import React from 'react';
import { connect } from 'react-redux';
import { UserActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
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

                <StaffList staff={this.props.staff.users} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        staff: state.users.users
    };
}

export default connect(mapStateToProps)(Staff);
