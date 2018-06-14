import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../../actions/global-actions';

import EditUserForm from '../../components/users/EditUserForm';

class EditUserContainer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit User'));
    }

    render() {
        return (
            <div className='content-15'>
                <EditUserForm user={this.props.user} />
            </div>
        );
    }
}

export default connect()(EditUserContainer);
