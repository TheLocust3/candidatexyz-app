import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { VolunteerApi, VolunteerActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Volunteer from '../../../components/communication/volunteers/Volunteer';

class ShowVolunteer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Volunteer'));
        this.props.dispatch(setBreadcrumb('Volunteers'));
        this.props.dispatch(setDrawerSelected('communication', 'volunteers'));

        this.props.dispatch(VolunteerActions.fetchVolunteer(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        VolunteerApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/volunteers');
        });
    }

    renderName() {
        if (_.isEmpty(this.props.volunteer.firstName) || _.isEmpty(this.props.volunteer.lastName)) return 'No Name Provided';

        return `${this.props.volunteer.firstName} ${this.props.volunteer.lastName}`;
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>{this.renderName()}</Text>

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
                    <Loader isReady={this.props.isReady}>
                        <Volunteer volunteer={this.props.volunteer} />
                    </Loader>
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
