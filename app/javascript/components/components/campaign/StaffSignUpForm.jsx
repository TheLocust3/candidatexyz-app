import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

export default class StaffSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: '', firstName: '', lastName: '', password: '', passwordConfirmation: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        StaffApi.create(this.props.token, this.state.email, this.state.firstName, this.state.lastName, this.state.password, this.state.passwordConfirmation).then(() => {
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
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} /><br /><br />

                <Button type='submit'>Sign Up</Button>
            </Form>
        );
    }
}

StaffSignUpForm.propTypes = {
    token: PropTypes.string.isRequired
};
