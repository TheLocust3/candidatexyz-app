import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

import Text from '../components/common/Text';
import EditUserForm from '../components/users/EditUserForm';

class Settings extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Settings'));
    }

    render() {
        return (
            <div className='content content-10'>
                <Text type='headline6'>User Settings</Text>
                <EditUserForm user={this.props.user} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(Settings);
