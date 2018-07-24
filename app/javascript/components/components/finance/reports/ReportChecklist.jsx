import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text, Checkbox } from 'candidatexyz-common-js/lib/elements';

export default class ReportChecklist extends React.Component {

    componentWillMount() {
        let chair = _.filter(this.props.users, (user) => { return user.position == 'Chair' })[0];
        let treasurer = _.filter(this.props.users, (user) => { return user.position == 'Treasurer' })[0];
        let candidate = _.filter(this.props.users, (user) => { return user.position == 'Candidate' })[0];

        if (!_.isUndefined(chair) && chair.created && !_.isUndefined(treasurer) && treasurer.created && !_.isUndefined(candidate) && candidate.created && !_.isEmpty(this.props.committee)) {
            this.props.complete();
        }
    }

    render() {
        let chair = _.filter(this.props.users, (user) => { return user.position == 'Chair' })[0];
        let treasurer = _.filter(this.props.users, (user) => { return user.position == 'Treasurer' })[0];
        let candidate = _.filter(this.props.users, (user) => { return user.position == 'Candidate' })[0];

        return (
            <div>
                <Text type='headline6'>Checklist</Text>

                <div className='content-2'>
                    <Checkbox className='checklist' label='Invite the Chairperson to your campaign' defaultChecked={!_.isUndefined(chair)} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Have the Chairperson accept invite' defaultChecked={!_.isUndefined(chair) && chair.created} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Invite the Treasurer to your campaign' defaultChecked={!_.isUndefined(treasurer)} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Have the Treasurer accept invite' defaultChecked={!_.isUndefined(treasurer) && treasurer.created} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Invite the Candidate to your campaign' defaultChecked={!_.isUndefined(candidate)} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Have the Candidate accept invite' defaultChecked={!_.isUndefined(candidate) && candidate.created} onChange={() => {}} inputProps={{ disabled: true }} /><br />
                    <Checkbox className='checklist' label='Form your committee' defaultChecked={!_.isEmpty(this.props.committee)} onChange={() => {}} inputProps={{ disabled: true }} />
                </div>
            </div>
        )
    }
}

ReportChecklist.propTypes = {
    users: PropTypes.array.isRequired,
    committee: PropTypes.object.isRequired,
    complete: PropTypes.func.isRequired
};
