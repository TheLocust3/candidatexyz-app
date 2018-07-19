import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../constants';

import AddressInput from '../common/AddressInput';

export default class StaffSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: { state: 'MA', country: 'United States' }, errors: {} };
    }

    handleChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;

        this.setState({
            user: user
        });
    }

    handleAddressChange(name, value) {
        let user = this.state.user;
        user[name] = value;

        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let user = this.state.user;

        StaffApi.create(this.props.token, user.email, user.firstName, user.lastName, user.password, user.passwordConfirmation, user.address, user.city, user.state, user.country, user.zipcode, user.phoneNumber, user.party).then(() => {
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
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} required /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} style={{ width: '47.5%', marginRight: '5%' }} required />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} style={{ width: '47.5%' }} required /><br /><br />

                <AddressInput state={this.state.state} country={this.state.country} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.zipcode} style={{ width: '100%' }} /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />
                <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} required /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} required /><br /><br />

                <Button type='submit'>Sign Up</Button>
            </Form>
        );
    }
}

StaffSignUpForm.propTypes = {
    token: PropTypes.string.isRequired
};
