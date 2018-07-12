import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import InviteForm from '../../components/campaign/InviteForm';

class InviteStaff extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'inviteStaff'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Invite Staff Member</Text>
                <br /><br />

                <div className='content-2'>
                    <InviteForm />
                </div>
            </div>
        );
    }
}

export default connect()(InviteStaff);
