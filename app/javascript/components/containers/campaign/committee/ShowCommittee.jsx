import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommitteeActions, CommitteeApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import Committee from '../../../components/campaign/committee/Committee';
import CreateCommittee from './CreateCommittee';

class ShowCommittee extends React.Component {

    constructor(props) {
        super(props);

        this.state = { isTimedOut: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Committee'));
        this.props.dispatch(setBreadcrumb('Committee'));
        this.props.dispatch(setDrawerSelected('campaign', 'committee'));

        this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());

        setTimeout(() => {
            this.setState({
                isTimedOut: true
            });
        }, 1000);
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        CommitteeApi.destroy(this.props.committee.id).then(() => {
            window.location.href = '/campaign';
        });
    }

    render() {
        let committee = this.props.committee;

        if (_.isEmpty(committee)) {
            return (
                <Loader isReady={this.state.isTimedOut}>
                    <CreateCommittee />
                </Loader>
            );
        }

        return (
            <div className='content'>
                <Text type='headline5'>{committee.name}</Text>

                <div className='resource-actions-under'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/campaign/committee/edit`}>
                        <Text type='body2'>Change</Text>
                    </Link>

                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Dissolve</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Committee committee={this.props.committee} />
                    </Loader>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.committees.isReady,
        committee: state.committees.committee
    };
}

export default connect(mapStateToProps)(ShowCommittee);
