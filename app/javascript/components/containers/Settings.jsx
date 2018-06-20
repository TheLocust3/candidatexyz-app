import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import MDCAutoInit from '../components/global/MDCAutoInit';
import Text from '../components/common/Text';
import EditUserForm from '../components/users/EditUserForm';

class Settings extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Settings'));
        this.props.dispatch(setBreadcrumb('Settings'));
        this.props.dispatch(setDrawerSelected('settings'))
    }

    render() {
        return (
            <div className='content content-10'>
                <Text type='headline6'>User Settings</Text>
                <EditUserForm user={this.props.user} />

                <MDCAutoInit />
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
