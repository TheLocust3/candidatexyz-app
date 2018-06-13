import React from 'react';

import AuthApi from '../../../api/auth-api';
import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

export default class ForgotPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: '', errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.forgotPassword(this.state.email).then((response) => {
            window.location.href = '/';
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

                <Button type='submit'>Reset Password</Button>
            </Form>
        );
    }
}
