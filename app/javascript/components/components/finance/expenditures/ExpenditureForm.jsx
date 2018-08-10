import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { ExpenditureApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

import AddressInput from '../../common/AddressInput';
import AutoCompleteTextField from '../../common/AutoCompleteTextField';
import DatePicker from '../../common/DatePicker';

export default class ExpenditureForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.expenditure)) {
            this.state.expenditure = { state: 'MA', country: 'United States', datePaid: new Date() };
        } else {
            this.state.expenditure = this.props.expenditure;
        }
    }

    handleChange(event) {
        let expenditure = this.state.expenditure;
        expenditure[event.target.name] = event.target.value;

        this.setState({
            expenditure: expenditure
        });
    }

    handleDateChange(date) {
        let expenditure = this.state.expenditure;
        expenditure.datePaid = date;

        this.setState({
            expenditure: expenditure
        });
    }

    handleAddressChange(name, value) {
        let expenditure = this.state.expenditure;
        expenditure[name] = value;

        this.setState({
            expenditure: expenditure
        });
    }

    handleSubmit(event) {
        let expenditure = this.state.expenditure;

        if (_.isEmpty(this.props.expenditure)) {
            ExpenditureApi.create(expenditure.paidTo, expenditure.purpose, expenditure.address, expenditure.city, expenditure.state, expenditure.country, expenditure.datePaid, expenditure.amount).then((response) => {
                history.push(`/finance/expenditures/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            ExpenditureApi.update(this.props.expenditure.id, expenditure.paidTo, expenditure.purpose, expenditure.address, expenditure.city, expenditure.state, expenditure.country, expenditure.datePaid, expenditure.amount).then((response) => {
                history.push(`/finance/expenditures/${this.props.expenditure.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(expenditure) {
        expenditure.amount = '';

        this.setState({
            expenditure: { ...expenditure, ...this.state.expenditure, name: expenditure.name }
        });
    }

    render() {
        let amount = _.isUndefined(this.state.expenditure.amount) ? null : String(this.state.expenditure.amount);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <AutoCompleteTextField elements={this.props.expenditures} elementKey='paidTo' label='Paid To' name='paidTo' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.expenditure.paidTo} required />

                <TextField label='Purpose' name='purpose' onChange={this.handleChange.bind(this)} defaultValue={this.state.expenditure.purpose} required />
                <br />

                <AddressInput address={this.state.expenditure.address} city={this.state.expenditure.city} state={this.state.expenditure.state} country={this.state.expenditure.country} inputs={['address', 'city', 'state', 'country']} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br />

                <DatePicker label='Date Paid:' defaultValue={this.state.expenditure.datePaid} onChange={(date) => { this.handleDateChange(date) }} style={{ display: 'inline-block' }} />
                <TextField type='number' label='Amount ($)' name='amount' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={amount} style={{ width: 'auto', marginLeft: '5%' }} required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

ExpenditureForm.propTypes = {
    expenditure: PropTypes.object,
    expenditures: PropTypes.array.isRequired
};
