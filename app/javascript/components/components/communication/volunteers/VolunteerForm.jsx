import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { VolunteerApi } from 'candidatexyz-common-js';
import { Button, TextField, TextArea, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

import AddressInput from '../../common/AddressInput';
import FullNameInput from '../../common/FullNameInput';

export default class VolunteerForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.volunteer)) {
            this.state.volunteer = { state: 'MA' };
        } else {
            this.state.volunteer = this.props.volunteer;
        }
    }

    handleChange(event) {
        let volunteer = this.state.volunteer;
        volunteer[event.target.name] = event.target.value;

        this.setState({
            volunteer: volunteer
        });
    }

    handleGenericChange(name, value) {
        let volunteer = this.state.volunteer;
        volunteer[name] = value;

        this.setState({
            volunteer: volunteer
        });
    }

    handleSubmit(event) {
        let volunteer = this.state.volunteer;

        if (_.isEmpty(this.props.volunteer)) {
            VolunteerApi.create(volunteer.email, volunteer.phoneNumber, volunteer.firstName, volunteer.lastName, volunteer.address, volunteer.zipcode, volunteer.city, volunteer.state, volunteer.helpBlurb).then((response) => {
                history.push(`/communication/volunteers/${response.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            VolunteerApi.update(this.props.volunteer.id, volunteer.email, volunteer.phoneNumber, volunteer.firstName, volunteer.lastName, volunteer.address, volunteer.zipcode, volunteer.city, volunteer.state, volunteer.helpBlurb).then((response) => {
                history.push(`/communication/volunteers/${this.props.volunteer.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    render() {
        let volunteer = this.state.volunteer;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <FullNameInput firstName={volunteer.firstName} lastName={volunteer.lastName} onChange={(name, value) => this.handleGenericChange(name, value)} required /><br />

                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={volunteer.email} required />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.volunteer.phoneNumber} /><br /><br />

                <AddressInput address={volunteer.address} city={volunteer.city} state={volunteer.state} zipcode={volunteer.zipcode} hideCountry={true} showZipcode={true} onChange={(name, value) => this.handleGenericChange(name, value)} required /><br />

                <TextField label='Help Type' name='helpBlurb' onChange={this.handleChange.bind(this)} defaultValue={this.state.volunteer.helpBlurb} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

VolunteerForm.propTypes = {
    volunteer: PropTypes.object
};
