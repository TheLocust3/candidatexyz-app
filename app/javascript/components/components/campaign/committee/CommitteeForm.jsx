import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CommitteeApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import AddressInput from '../../common/AddressInput';
import CommitteeChecklist from './CommitteeChecklist';

export default class CommitteeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { checklistComplete: false, errors: {} };
        if (_.isEmpty(this.props.committee)) {
            this.state.committee = { state: 'MA', country: 'United States' };
        } else {
            this.state.committee = this.props.committee;
        }
    }

    handleChange(event) {
        let committee = this.state.committee;
        committee[event.target.name] = event.target.value;

        this.setState({
            committee: committee
        });
    }

    handleAddressChange(name, value) {
        let committee = this.state.committee;
        committee[name] = value;

        this.setState({
            committee: committee
        });
    }

    handleSubmit(event) {
        let committee = this.state.committee;

        if (_.isEmpty(this.props.committee)) {
            CommitteeApi.create(committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.office, committee.district, committee.bank).then((response) => {
                window.location.reload();
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            CommitteeApi.update(this.props.committee.id, committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.office, committee.district, committee.bank).then((response) => {
                window.location.reload();
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    renderForm() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Committee Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.name} required /><br />
                <TextField label='Office' name='office' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.office} required /><br />
                <TextField label='District' name='district' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.district} required /><br /><br />

                <TextField type='email' label='Committee Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.email} required /><br />
                <TextField label='Committee Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.phoneNumber} required /><br /><br />

                <AddressInput address={this.state.committee.address} city={this.state.committee.city} state={this.state.committee.state} country={this.state.committee.country} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br />

                <TextField label='Bank Name' name='bank' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.bank} required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }

    renderUncompleted() {
        return (
            <Text type='body1'>
                Before creating forming your campaign's committee, you must complete the above checklist
            </Text>
        );
    }

    render() {
        return (
            <div>
                <CommitteeChecklist users={this.props.users} complete={() => { this.setState({ checklistComplete: true }) }} />
                <br />

                {this.state.checklistComplete ? this.renderForm() : this.renderUncompleted()}
            </div>
        );
    }
}

CommitteeForm.propTypes = {
    committee: PropTypes.object,
    users: PropTypes.array.isRequired
};
