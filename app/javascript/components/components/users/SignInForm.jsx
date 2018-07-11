import _ from 'lodash';
import React from 'react';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button, Checkbox } from 'candidatexyz-common-js/lib/elements';

import { setCookie, getCookie } from '../../../helpers';

export default class SignInForm extends React.Component {

    constructor(props) {
        super(props);

        let email = getCookie('email');
        this.state = { email: email, password: null, rememberMe: !_.isEmpty(email), errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCheckbox() {
        this.setState({
            rememberMe: !this.state.rememberMe
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.rememberMe) {
            setCookie('email', this.state.email, 14);
        } else {
            setCookie('email', '', 14);
        }

        AuthApi.signIn(this.state.email, this.state.password).then((response) => {
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
                <TextField label='Email' name='email' defaultValue={this.state.email} onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />

                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br />

                <Checkbox label='Remember Me' defaultChecked={this.state.rememberMe} onChange={() => this.handleCheckbox()} /><br /><br />

                <Button type='submit'>Sign In</Button>
            </Form>
        );
    }
}
