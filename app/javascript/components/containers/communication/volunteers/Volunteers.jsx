import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VolunteerActions, VolunteerApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Table from '../../../components/common/Table';

const PER_PAGE = 20;

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
                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to='/communication/mail/volunteers'>
                        <Text type='body2'>
                            Email
                        </Text>
                    </Link>

                    <div className='resource-actions-spacer' />
                
                    <a className='resource-actions-item unstyled-link-black' href={`${VolunteerApi.exportLink()}`} download>
                        <Text type='body2'>Download</Text>
                    </a>
                </div>
                <br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/communication/volunteers/' headers={['First Name', 'Last Name', 'Email', 'Address', 'Help Type']} keys={['firstName', 'lastName', 'email', 'address', 'helpBlurb']} rows={this.props.volunteers.volunteers} rowsPerPage={PER_PAGE} pagerLink='/communication/volunteers' />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.volunteers.isReady,
        volunteers: state.volunteers.volunteers
    };
}

export default connect(mapStateToProps)(Volunteers);
