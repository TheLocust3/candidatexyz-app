import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StaffActions, StaffApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';
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

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        StaffApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/staff');
        });
    }

    renderUser() {
        if (!this.props.isReady) return;

        return <User user={this.props.user} />;
    }

    renderActions() {
        if (!this.props.currentUser.admin) return;

        return (
            <div className='resource-actions'>
                <Link className='resource-actions-item unstyled-link-black' to={`/campaign/staff/${this.props.match.params.id}/edit`}>
                    <Text type='body2'>Edit</Text>
                </Link>

                <div className='resource-actions-spacer' />

                <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                    <Text type='body2'>Delete</Text>
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View User</Text>

                {this.renderActions()}
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
        user: state.users.user,
        currentUser: state.users.currentUser
    };
}

export default connect(mapStateToProps)(ShowUser);
