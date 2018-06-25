import React from 'react';
import PropTypes from 'prop-types';
import { ContactApi } from 'candidatexyz-common-js';

import { history } from '../../../../constants';

import MDCAutoInit from '../../global/MDCAutoInit';
import Button from '../../common/Button';
import TextField from '../../common/TextField';
import Form from '../../common/Form';

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { contact: this.props.contact, errors: {} };
    }

    handleChange(event) {
        let contact = this.state.contact;
        contact[event.target.name] = event.target.value;

        this.setState({
            contact: contact
        });
    }

    handleSubmit(event) {
        ContactApi.update(this.props.contact.id, this.state.contact.email, this.state.contact.zipCode, this.state.contact.firstName, this.state.contact.lastName, this.state.contact.phoneNumber).then((response) => {
            history.push(`/communication/sign-ups/${this.props.contact.id}`)
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.contact.email} style={{ width: '100%' }} /><br /><br />

                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.contact.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.contact.lastName} style={{ width: '100%' }} /><br /><br />

                <TextField label='Zipcode' name='zipCode' onChange={this.handleChange.bind(this)} defaultValue={this.props.contact.zipCode} style={{ width: '100%' }} /><br />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.contact.phoneNumber} style={{ width: '100%' }} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    contact: PropTypes.object
};
