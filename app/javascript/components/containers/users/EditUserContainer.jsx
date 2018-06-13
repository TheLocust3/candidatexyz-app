import React from 'react';
import { connect } from 'react-redux';

import EditUserForm from '../../components/users/EditUserForm';

class EditUserContainer extends React.Component {

    render() {
        return (
            <div className='content-15'>
                <EditUserForm user={this.props.user} />
            </div>
        );
    }
}

export default connect()(EditUserContainer);
