import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';

import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

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
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} style={{ width: '40%' }} /><br />
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} style={{ width: '40%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} style={{ width: '40%' }} /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} style={{ width: '40%' }} /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} style={{ width: '40%' }} /><br /><br />

                <Button type='submit'>Sign Up</Button>
            </Form>
        );
    }
}

StaffSignUpForm.propTypes = {
    token: PropTypes.string.isRequired
};
