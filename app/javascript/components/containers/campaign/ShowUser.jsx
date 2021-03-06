import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StaffActions, StaffApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';
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
            history.push('/campaign/staff');
        });
    }

    renderActions() {
        if (!this.props.currentUser.admin) return;

        return (
            <span className='resource-actions relative'>
                <Link className='resource-actions-item unstyled-link-black' to={`/campaign/staff/${this.props.match.params.id}/edit`}>
                    <i className='material-icons middle'>edit</i>
                </Link>

                <a className='resource-actions-item unstyled-link-black delete' href='#' onClick={this.onDeleteClick.bind(this)}>
                    <i className='material-icons middle'>delete</i>
                </a>
            </span>
        );
    }

    renderName() {
        if (_.isEmpty(this.props.user.firstName) || _.isEmpty(this.props.user.lastName)) return 'No Name Provided';

        return `${this.props.user.firstName} ${this.props.user.lastName} ${this.props.user.admin ? '(Admin)' : ''}`;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>
                    {this.renderName()}

                    {this.renderActions()}
                </Text>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <User user={this.props.user} />
                    </Loader>
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
