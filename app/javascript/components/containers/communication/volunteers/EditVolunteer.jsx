import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, VolunteerApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import VolunteerForm from '../../../components/communication/volunteers/VolunteerForm';

class EditVolunteer extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Volunteer'));
        this.props.dispatch(setBreadcrumb('Volunteer'));
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
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit Volunteer</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <VolunteerForm volunteer={this.props.volunteer} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/communication/volunteers/${this.props.match.params.id}`} />
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

export default connect(mapStateToProps)(EditVolunteer);
