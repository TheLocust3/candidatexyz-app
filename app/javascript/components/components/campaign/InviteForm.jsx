import React from 'react';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import Loader from '../common/Loader';

export default class InviteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: '', sending: false, errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            sending: true
        });

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
                <Loader isReady={!this.state.sending}>
                    <TextField type='email' label='Email' name='email' onChange={(event) => this.handleChange(event)} required={true} />
                    <br /><br />
                    
                    <Button type='submit'>Invite</Button>
                </Loader>
            </Form>
        );
    }
}
