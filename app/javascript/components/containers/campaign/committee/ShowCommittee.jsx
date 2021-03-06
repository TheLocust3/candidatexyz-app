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

        this.interval = setInterval(() => this.refresh(), 1500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        CommitteeApi.destroy(this.props.committee.id).then(() => {
            window.location.href = '/campaign';
        });
    }

    renderLinks() {
        if (!this.props.committee.dissolved) {
            return (
                <div>
                    <Link className='resource-actions-item unstyled-link-black' to={`/campaign/committee/edit`}>
                        <Text type='body2'>Change</Text>
                    </Link>
    
                    <Link className='resource-actions-item unstyled-link-black' to={`/campaign/committee/dissolve`}>
                        <Text type='body2'>Dissolve</Text>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                <Link className='resource-actions-item unstyled-link-black' to={`/campaign/committee/new`}>
                    <Text type='body2'>New Committee</Text>
                </Link>
            </div>
        );
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
                <Text type='headline5'>{committee.name} {this.props.committee.dissolved ? '(Dissolved)' : ''}</Text>

                <div className='resource-actions-under'>
                    {this.renderLinks()}
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

    refresh() {
        if (this.props.committee.report.status != 'done' && !_.includes(_.lowerCase(this.props.committee.report.status), 'error')) {
            this.props.dispatch(CommitteeActions.fetchCommitteeByCampaign());
        } else {
            clearInterval(this.interval);
        }
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.committees.isReady,
        committee: state.committees.committee
    };
}

export default connect(mapStateToProps)(ShowCommittee);
