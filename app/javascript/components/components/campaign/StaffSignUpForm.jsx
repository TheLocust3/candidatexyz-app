import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../constants';

import AddressInput from '../common/AddressInput';

export default class StaffSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { state: 'MA', country: 'United States', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleAddressChange(name, value) {
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        StaffApi.create(this.props.token, this.state.email, this.state.firstName, this.state.lastName, this.state.password, this.state.passwordConfirmation, this.state.address, this.state.city, this.state.state, this.state.country, this.state.phoneNumber).then(() => {
            history.push('/');
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} required /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} required /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} required /><br /><br />

                <AddressInput state={this.state.state} country={this.state.country} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} /><br /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} required /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} required /><br /><br />

                <Button type='submit'>Sign Up</Button>
            </Form>
        );
    }
}

StaffSignUpForm.propTypes = {
    token: PropTypes.string.isRequired
};
