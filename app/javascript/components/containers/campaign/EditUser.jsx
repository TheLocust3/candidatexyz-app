import React from 'react';
import { connect } from 'react-redux';
import { StaffActions, StaffApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import UserForm from '../../components/campaign/UserForm';

class EditUser extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Staff'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'staff'));

        this.props.dispatch(StaffActions.fetchUser(this.props.match.params.id));
    }

    onDeleteClick(event) {
        StaffApi.destroy(this.props.match.params.id).then(() => {
            history.push('/campaign/staff');
        });
    }

    renderUserForm() {
        if (!this.props.isReady) return;

        return <UserForm user={this.props.user} />;
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
                    {this.renderUserForm()}
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
        user: state.users.user
    };
}

export default connect(mapStateToProps)(EditUser);
