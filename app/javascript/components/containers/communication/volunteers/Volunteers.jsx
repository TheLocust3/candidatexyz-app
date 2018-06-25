import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Text from '../../../components/common/Text';
import Table from '../../../components/common/Table';

class Volunteers extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Volunteers'));
        this.props.dispatch(setBreadcrumb('Volunteers'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));

        this.props.dispatch(VolunteerActions.fetchAllVolunteers());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Volunteer List</Text>
                <br /><br />

                <div className='content-1'>
                    <Table to='/communication/volunteers/' headers={['First Name', 'Last Name', 'Email', 'Address', 'Help Type']} keys={['firstName', 'lastName', 'email', 'address', 'helpBlurb']} rows={this.props.volunteers.volunteers} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        volunteers: state.volunteers.volunteers
    };
}

export default connect(mapStateToProps)(Volunteers);