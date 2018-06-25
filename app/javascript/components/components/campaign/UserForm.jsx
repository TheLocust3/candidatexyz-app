import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';

import MDCAutoInit from '../global/MDCAutoInit';
import Button from '../common/Button';
import TextField from '../common/TextField';
import Checkbox from '../common/Checkbox';
import Form from '../common/Form';

export default class UserForm extends React.Component {

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

    handleAdminCheck(event) {
        let user = this.state.user;
        user.admin = !user.admin;

        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        StaffApi.update(this.props.user.id, this.state.user.email, this.state.user.firstName, this.state.user.lastName, this.state.user.admin).then((response) => {
            history.push(`/campaign/staff/${this.props.user.id}`)
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.email} style={{ width: '100%' }} /><br /><br />

                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.lastName} style={{ width: '100%' }} /><br />

                <Checkbox label='Admin' onChange={this.handleAdminCheck.bind(this)} defaultChecked={this.props.user.admin} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

UserForm.propTypes = {
    user: PropTypes.object
};
