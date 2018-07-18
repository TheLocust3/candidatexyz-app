import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CommitteeApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

import AddressInput from '../../common/AddressInput';

export default class CommitteeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
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

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Committee Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.name} style={{ width: '100%' }} required /><br />
                <TextField label='Office' name='office' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.office} style={{ width: '100%' }} required /><br />
                <TextField label='District' name='district' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.district} style={{ width: '100%' }} required /><br /><br />

                <TextField type='email' label='Committee Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.email} style={{ width: '100%' }} required /><br />
                <TextField label='Committee Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.phoneNumber} style={{ width: '100%' }} required /><br /><br />

                <AddressInput address={this.state.committee.address} city={this.state.committee.city} state={this.state.committee.state} country={this.state.committee.country} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br />

                <TextField label='Bank Name' name='bank' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.bank} style={{ width: '100%' }}  required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

CommitteeForm.propTypes = {
    committee: PropTypes.object
};
