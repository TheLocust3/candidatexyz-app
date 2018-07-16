import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../constants';

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

    handleStateChange(select) {
        this.setState({
            state: select.value
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

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.state })} style={{ width: '40%' }}>
                {STATES.map((state) => {
                    return (
                        <SelectItem key={state}>
                            {state}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} required /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} required /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} required /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} /><br /><br />
                {this.renderStateDropdown()}<br />
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.state.country} /><br /><br />

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
