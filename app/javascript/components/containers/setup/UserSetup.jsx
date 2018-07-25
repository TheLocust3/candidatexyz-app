import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { StaffActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import BackLink from '../../components/common/BackLink';
import EditUserForm from '../../components/users/EditUserForm';

class UserSetup extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: {} };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Setup User'));
        this.props.dispatch(setBreadcrumb('Setup'));

        this.props.dispatch(StaffActions.fetchStaffPositions());
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isCurrentUserReady) return;

        let user = nextProps.user;
        user.position = _.isEmpty(user.position) ? '' : user.position;
        user.state = _.isEmpty(user.state) ? 'MA' : user.state;

        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Tell us about yourself</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady && this.props.isCurrentUserReady}>
                        <EditUserForm user={this.state.user} positions={this.props.positions.positions} redirect='/campaign' initialEdit />
                    </Loader>
                </div>

                <BackLink to='/' />
            </div>
        );
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

export default connect(mapStateToProps)(UserSetup);
