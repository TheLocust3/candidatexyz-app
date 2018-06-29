import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';

import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

export default class InviteForm extends React.Component {

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

        StaffApi.createToken(this.state.email).then(() => {
            history.push('/campaign/staff');
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField type='email' label='Email' name='email' onChange={(event) => this.handleChange(event)} required={true} />
                <br /><br />
                
                <Button type='submit'>Invite</Button>
            </Form>
        );
    }
}
