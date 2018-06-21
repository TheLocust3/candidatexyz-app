import React from 'react';
import { AuthApi } from 'candidatexyz-common-js';

import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: null, firstName: null, lastName: null, password: null, passwordConfirmation: null, errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.register(this.state.email, this.state.password, this.state.passwordConfirmation, this.state.firstName, this.state.lastName).then((response) => {
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
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} /><br />

                <Button type='submit'>Register</Button>
            </Form>
        );
    }
}
