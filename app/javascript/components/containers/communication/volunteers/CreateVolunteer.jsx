import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import VolunteerForm from '../../../components/communication/volunteers/VolunteerForm';

class CreateVolunteer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Create Volunteer'));
        this.props.dispatch(setBreadcrumb('Volunteers'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));
    }

    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Create Volunteer</Text>
                <br /><br />

                <div className='content-2'>
                    <VolunteerForm />
                </div>
                <br />

                <BackLink to='/communication/volunteers/' />
            </div>
        );
    }
}

export default connect()(CreateVolunteer);
