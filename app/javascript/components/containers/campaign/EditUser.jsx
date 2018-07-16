import React from 'react';
import { connect } from 'react-redux';
import { StaffActions, StaffApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
import BackLink from '../../components/common/BackLink';
import UserForm from '../../components/campaign/UserForm';

class EditUser extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Staff'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'staff'));

        this.props.dispatch(StaffActions.fetchStaffPositions());
        this.props.dispatch(StaffActions.fetchUser(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        StaffApi.destroy(this.props.match.params.id).then(() => {
            history.push('/campaign/staff');
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Sign Up</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <UserForm user={this.props.user} positions={this.props.positions.positions} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/campaign/staff/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        user: state.users.user,
        positions: state.users.positions
    };
}

export default connect(mapStateToProps)(EditUser);
