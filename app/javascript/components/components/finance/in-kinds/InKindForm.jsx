import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { InKindApi } from 'candidatexyz-common-js';
import { Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

import AddressInput from '../../common/AddressInput';
import AutoCompleteTextField from '../../common/AutoCompleteTextField';
import DatePicker from '../../common/DatePicker';

export default class InKindForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.inKind)) {
            this.state.inKind = { state: 'MA', country: 'United States', dateReceived: new Date() };
        } else {
            this.state.inKind = this.props.inKind;
        }
    }

    handleChange(event) {
        let inKind = this.state.inKind;
        inKind[event.target.name] = event.target.value;

        this.setState({
            inKind: inKind
        });
    }

    handleDateChange(date) {
        let inKind = this.state.inKind;
        inKind.datePaid = date;

        this.setState({
            inKind: inKind
        });
    }

    handleAddressChange(name, value) {
        let inKind = this.state.inKind;
        inKind[name] = value;

        this.setState({
            inKind: inKind
        });
    }

    handleSubmit(event) {
        let inKind = this.state.inKind;

        if (_.isEmpty(this.props.inKind)) {
            InKindApi.create(inKind.fromWhom, inKind.description, inKind.address, inKind.city, inKind.state, inKind.country, inKind.dateReceived, inKind.value, inKind.email, inKind.phoneNumber).then((response) => {
                history.push(`/finance/in-kinds/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            InKindApi.update(this.props.inKind.id, inKind.fromWhom, inKind.description, inKind.address, inKind.city, inKind.state, inKind.country, inKind.dateReceived, inKind.value, inKind.email, inKind.phoneNumber).then((response) => {
                history.push(`/finance/in-kinds/${this.props.inKind.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(inKind) {
        inKind.value = '';

        this.setState({
            inKind: { ...inKind, ...this.state.inKind, name: inKind.name }
        });
    }

    render() {
        let value = _.isUndefined(this.state.inKind.value) ? null : String(this.state.inKind.value);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                {/* Autocomplete inKinds is generalized so use name */}
                <AutoCompleteTextField elements={this.props.inKinds} elementKey='name' label='From Whom' name='fromWhom' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.inKind.fromWhom} required /><br />

                <TextField label='Description' name='description' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.description} required /><br /><br />

                <AddressInput address={this.state.inKind.address} city={this.state.inKind.city} state={this.state.inKind.state} country={this.state.inKind.country} inputs={['address', 'city', 'state', 'country']} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br /><br />

                <DatePicker label='Date Received:' defaultValue={this.state.inKind.dateReceived} onChange={(date) => { this.handleDateChange(date) }} style={{ display: 'inline-block' }} />
                <TextField type='number' label='Value ($)' name='value' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={value} style={{ width: 'auto', marginLeft: '5%' }} required /><br />

                <TextField type='email' label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.email} style={{ width: '57.5%', marginRight: '5%' }} />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.phoneNumber} style={{ width: '37.5%' }} />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

InKindForm.propTypes = {
    inKind: PropTypes.object,
    inKinds: PropTypes.array.isRequired
};
