import _ from 'lodash';
import React from 'react';
import { AuthApi } from 'candidatexyz-common-js';

import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

export default class SignInForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: null, password: null, rememberMe: false, errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCheckbox(event) {
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.signIn(this.state.email, this.state.password, this.state.rememberMe).then((response) => {
            window.location.href = '/';
        }).catch((response) => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    renderError() {
        if (_.isEmpty(this.state.error)) return;

        return (
            <div>
                {this.state.error}
            </div>
        )
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br /><br />

                <Button type='submit'>Sign In</Button>
            </Form>
        );
    }
}
