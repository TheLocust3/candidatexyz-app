import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { STATES } from '../../../constants';

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: this.props.user.email, firstName: this.props.user.first_name, lastName: this.props.user.last_name,
            address: this.props.user.address, city: this.props.user.city, state: this.props.user.state, country: this.props.user.country, errors: {} };
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

        AuthApi.editUser(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.firstName, this.state.lastName, this.state.address, this.state.city, this.state.state, this.state.country, this.state.phoneNumber).then((response) => {
            window.location.href = '/';
        }).catch((response) => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.state })} style={{ width: '30%', marginRight: '5%' }}>
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
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.email} style={{ width: '100%' }} /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.lastName} style={{ width: '100%' }} /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.address} style={{ width: '100%' }} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.city} style={{ width: '30%', marginRight: '5%' }} />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.state.country} style={{ width: '30%' }} /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.phoneNumber} style={{ width: '100%' }} /><br /><br />

                <TextField type='password' label='New Password' name='password' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />
                <TextField type='password' label='Confirm New Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired
};
