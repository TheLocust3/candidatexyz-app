import React from 'react';
import { connect } from 'react-redux';
import { StaffActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import User from '../../components/campaign/User';

class ShowUser extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View User'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'staff'));

        this.props.dispatch(StaffActions.fetchUser(this.props.match.params.id));
    }

    renderUser() {
        if (!this.props.isReady) return;

        return <User user={this.props.user} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View User</Text>
                <br /><br />

                <div className='content-2'>
                    {this.renderUser()}
                </div>
                <br />

                <BackLink to='/campaign/staff' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        user: state.users.user
    };
}

export default connect(mapStateToProps)(ShowUser);
