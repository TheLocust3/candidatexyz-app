import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { LiabilityApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

import AddressInput from '../../common/AddressInput';
import AutoCompleteTextField from '../../common/AutoCompleteTextField';
import DatePicker from '../../common/DatePicker';

export default class LiabilityForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.liability)) {
            this.state.liability = { state: 'MA', country: 'United States', dateIncurred: new Date() };
        } else {
            this.state.liability = this.props.liability;
        }
    }

    handleChange(event) {
        let liability = this.state.liability;
        liability[event.target.name] = event.target.value;

        this.setState({
            liability: liability
        });
    }

    handleDateChange(date) {
        let liability = this.state.liability;
        liability.datePaid = date;

        this.setState({
            liability: liability
        });
    }

    handleAddressChange(name, value) {
        let liability = this.state.liability;
        liability[name] = value;

        this.setState({
            liability: liability
        });
    }

    handleSubmit(event) {
        let liability = this.state.liability;

        if (_.isEmpty(this.props.liability)) {
            LiabilityApi.create(liability.toWhom, liability.purpose, liability.address, liability.city, liability.state, liability.country, liability.dateIncurred, liability.amount).then((response) => {
                history.push(`/finance/liabilities/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            LiabilityApi.update(this.props.liability.id, liability.toWhom, liability.purpose, liability.address, liability.city, liability.state, liability.country, liability.dateIncurred, liability.amount).then((response) => {
                history.push(`/finance/liabilities/${this.props.liability.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(liability) {
        liability.amount = '';

        this.setState({
            liability: { ...liability, ...this.state.liability, name: liability.name }
        });
    }

    render() {
        let amount = _.isUndefined(this.state.liability.amount) ? null : String(this.state.liability.amount);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <AutoCompleteTextField elements={this.props.liabilities} elementKey='toWhom' label='To Whom' name='toWhom' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.liability.toWhom} required /><br />

                <TextField label='Purpose' name='purpose' onChange={this.handleChange.bind(this)} defaultValue={this.state.liability.purpose} required /><br /><br />

                <AddressInput address={this.state.liability.address} city={this.state.liability.city} state={this.state.liability.state} country={this.state.liability.country} inputs={['address', 'city', 'state', 'country']} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br /><br />

                <DatePicker label='Date Incurred:' defaultValue={this.state.liability.dateIncurred} onChange={(date) => { this.handleDateChange(date) }} style={{ display: 'inline-block' }} />
                <TextField type='number' label='Amount ($)' name='amount' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={amount} style={{ width: 'auto', marginLeft: '5%' }} required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

LiabilityForm.propTypes = {
    liability: PropTypes.object,
    liabilities: PropTypes.array.isRequired
};
