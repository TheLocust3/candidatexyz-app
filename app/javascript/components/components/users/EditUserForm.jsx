import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button } from 'candidatexyz-common-js/lib/elements';

import AddressInput from '../common/AddressInput';
import FullNameInput from '../common/FullNameInput';

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

    handleGenericChange(name, value) {
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
        let user = this.state.user;
        
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <FullNameInput firstName={user.firstName} lastName={user.lastName} onChange={(name, value) => this.handleGenericChange(name, value)} required /><br />

                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={user.email} /><br />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={user.phoneNumber} /><br /><br />

                <AddressInput address={user.address} city={user.city} state={user.state} country={user.country} zipcode={user.zipcode} showZipcode={true} onChange={(name, value) => this.handleGenericChange(name, value)} /><br />

                <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} defaultValue={user.party} /><br /><br />

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
