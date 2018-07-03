import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { VolunteerActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Text from '../../../components/common/Text';
import Pager from '../../../components/common/Pager';
import Table from '../../../components/common/Table';

const PER_PAGE = 10;

class Volunteers extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Volunteers'));
        this.props.dispatch(setBreadcrumb('Volunteers'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));

        this.props.dispatch(VolunteerActions.fetchAllVolunteers());
    }

    render() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <div className='content'>
                <Text type='headline5'>Volunteer List</Text>
                <br /><br />

                <div className='content-1'>
                    <Loader isReady={this.props.isReady}>
                        <Table to='/communication/volunteers/' headers={['First Name', 'Last Name', 'Email', 'Address', 'Help Type']} keys={['firstName', 'lastName', 'email', 'address', 'helpBlurb']} rows={_.slice(this.props.volunteers.volunteers, page * PER_PAGE, (page + 1) * PER_PAGE)} />
                        <br /><br />

                        <Pager elements={this.props.volunteers.volunteers} elementsPerPage={PER_PAGE} baseLink='/communication/volunteers' />
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
