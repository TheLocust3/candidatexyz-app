import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { STATES } from '../../../constants';

import AddressInput from '../common/AddressInput';

export default class EditUserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: this.props.user, errors: {} };
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

        AuthApi.editUser(user.email, user.password, user.passwordConfirmation, user.firstName, user.lastName, user.address, user.city, user.state, user.country, user.zipcode, user.phoneNumber, user.party).then((response) => {
            window.location.href = '/';
        }).catch((response) => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.email} /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.firstName} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.lastName} /><br />

                <AddressInput address={this.props.user.address} city={this.props.user.city} state={this.props.user.state} country={this.props.user.country} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.zipcode} required /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.phoneNumber} /><br />
                <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.party} /><br /><br />

                <TextField type='password' label='New Password' name='password' onChange={this.handleChange.bind(this)} /><br />
                <TextField type='password' label='Confirm New Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} /><br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired
};
