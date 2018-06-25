import React from 'react';
import PropTypes from 'prop-types';
import { VolunteerApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';

import MDCAutoInit from '../global/MDCAutoInit';
import Button from '../common/Button';
import TextField from '../common/TextField';
import TextArea from '../common/TextArea';
import Form from '../common/Form';

export default class SignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { volunteer: this.props.volunteer, errors: {} };
    }

    handleChange(event) {
        let volunteer = this.state.volunteer;
        volunteer[event.target.name] = event.target.value;

        this.setState({
            volunteer: volunteer
        });
    }

    handleSubmit(event) {
        VolunteerApi.update(this.props.volunteer.id, this.state.volunteer.email, this.state.volunteer.phoneNumber, this.state.volunteer.firstName, this.state.volunteer.lastName, this.state.volunteer.address, this.state.volunteer.zipcode, this.state.volunteer.city, this.state.volunteer.state, this.state.volunteer.helpBlurb).then((response) => {
            history.push(`/communication/volunteers/${this.props.volunteer.id}`)
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.email} style={{ width: '100%' }} /><br /><br />

                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.lastName} style={{ width: '100%' }} /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.address} style={{ width: '100%' }} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.city} style={{ width: '100%' }} /><br />
                <TextField label='State' name='state' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.state} style={{ width: '100%' }} /><br />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.zipcode} style={{ width: '100%' }} /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.phoneNumber} style={{ width: '100%' }} /><br /><br />

                <TextArea label='Help Blurb' name='helpBlurb' onChange={this.handleChange.bind(this)} defaultValue={this.props.volunteer.helpBlurb} rows={10} style={{ width: '100%' }} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

SignUpForm.propTypes = {
    volunteer: PropTypes.object
};
