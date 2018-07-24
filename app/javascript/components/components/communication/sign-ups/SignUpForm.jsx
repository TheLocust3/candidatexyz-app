import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { ContactApi } from 'candidatexyz-common-js';
import { Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

import FullNameInput from '../../common/FullNameInput';

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.contact)) {
            this.state.contact = {};
        } else {
            this.state.contact = this.props.contact;
        }
    }

    handleChange(event) {
        let contact = this.state.contact;
        contact[event.target.name] = event.target.value;

        this.setState({
            contact: contact
        });
    }

    handleGenericChange(name, value) {
        let contact = this.state.contact;
        contact[name] = value;

        this.setState({
            contact: contact
        });
    }

    handleSubmit(event) {
        let contact = this.state.contact;

        if (_.isEmpty(this.props.contact)) {
            ContactApi.create(contact.email, contact.zipcode, contact.firstName, contact.lastName, contact.phoneNumber).then((response) => {
                history.push(`/communication/sign-ups/${response.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            ContactApi.update(this.props.contact.id, contact.email, contact.zipcode, contact.firstName, contact.lastName, contact.phoneNumber).then((response) => {
                history.push(`/communication/sign-ups/${this.props.contact.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    render() {
        let contact = this.state.contact;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <FullNameInput firstName={contact.firstName} lastName={contact.lastName} onChange={(name, value) => this.handleGenericChange(name, value)} /><br />

                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={contact.email} required /><br /><br />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={contact.phoneNumber} /><br /><br />

                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={contact.zipcode} required /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    contact: PropTypes.object
};
