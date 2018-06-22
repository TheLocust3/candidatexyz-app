import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import Volunteer from '../../components/communication/Volunteer';

class ShowVolunteer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Volunteer'));
        this.props.dispatch(setBreadcrumb('Volunteer'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));

        this.props.dispatch(VolunteerActions.fetchVolunteer(this.props.match.params.id));
    }

    renderVolunteer() {
        if (!this.props.isReady) return;

        return <Volunteer volunteer={this.props.volunteer} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Volunteer</Text>
                <br /><br />

                <div className='content-2'>
                    {this.renderVolunteer()}
                </div>
                <br />

                <BackLink to='/communication/volunteers' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.volunteers.isReady,
        volunteer: state.volunteers.volunteer
    };
}

export default connect(mapStateToProps)(ShowVolunteer);
