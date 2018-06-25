import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VolunteerApi, VolunteerActions } from 'candidatexyz-common-js';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Text from '../../../components/common/Text';
import BackLink from '../../../components/common/BackLink';
import Volunteer from '../../../components/communication/volunteers/Volunteer';

class ShowVolunteer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Volunteer'));
        this.props.dispatch(setBreadcrumb('Volunteer'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));

        this.props.dispatch(VolunteerActions.fetchVolunteer(this.props.match.params.id));
    }

    onDeleteClick(event) {
        VolunteerApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/volunteers');
        });
    }

    renderVolunteer() {
        if (!this.props.isReady) return;

        return <Volunteer volunteer={this.props.volunteer} />;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Volunteer</Text>

                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/communication/volunteers/${this.props.match.params.id}/edit`}>
                        <Text type='body2'>Edit</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
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