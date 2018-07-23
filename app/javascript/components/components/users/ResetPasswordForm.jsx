import React from 'react';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button } from 'candidatexyz-common-js/lib/elements';

export default class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { password: '', passwordConfirmation: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.resetPassword(this.state.password, this.state.passwordConfirmation).then( response => {
            window.location.href = '/';
        }).catch( response => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField type='password' label='Password' name='password' onChange={this.handleChange.bind(this)} /><br />
                <TextField type='password' label='Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} /><br /><br />

                <Button type='submit'>Reset Password</Button>
            </Form>
        );
    }
}
