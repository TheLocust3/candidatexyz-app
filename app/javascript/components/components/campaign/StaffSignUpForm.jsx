import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import AddressInput from '../common/AddressInput';
import FullNameInput from '../common/FullNameInput';

export default class StaffSignUpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: this.props.user, errors: {} };
        this.state.user.state = _.isEmpty(this.state.user.state) ? 'MA' : this.state.user.state;
        this.state.user.country = _.isEmpty(this.state.user.country) ? 'United States' : this.state.user.country;
    }

    handleChange(event) {
        let user = this.state.user;
        user[event.target.name] = event.target.value;

        this.setState({
            user: user
        });
    }

    handleGenericChange(name, value) {
        let user = this.state.user;
        user[name] = value;

        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let user = this.state.user;

        StaffApi.create(this.props.token, user.email, user.firstName, user.lastName, user.password, user.passwordConfirmation, user.address, user.city, user.state, user.country, user.zipcode, user.phoneNumber, user.party).then(() => {
            history.push('/');
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    render() {
        let extraRequired = !_.isEmpty(this.state.user.position);

        let user = this.state.user;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <FullNameInput firstName={user.firstName} lastName={user.lastName} onChange={(name, value) => this.handleGenericChange(name, value)} required /><br />

                <TextField label='Email' name='email' defaultValue={user.email} onChange={this.handleChange.bind(this)} disabled required /><br />
                <TextField label='Phone Number' name='phoneNumber' defaultValue={this.state.user.phoneNumber} onChange={this.handleChange.bind(this)} required={extraRequired} /><br />

                <AddressInput state={user.state} country={user.country} zipcode={user.zipcode} showZipcode={true} onChange={(name, value) => this.handleGenericChange(name, value)} required={extraRequired} /><br />

                <TextField label='Party' name='party' defaultValue={this.state.user.party} onChange={this.handleChange.bind(this)} required={extraRequired} /><br />

                <TextField type='password' label='Password' name='password' defaultValue={this.state.user.password} onChange={this.handleChange.bind(this)} required /><br />
                <TextField type='password' label='Confirm Password' name='passwordConfirmation' defaultValue={this.state.user.passwordConfirmation} onChange={this.handleChange.bind(this)} required /><br /><br />

                <Button type='submit'>Sign Up</Button>
            </Form>
        );
    }
}

StaffSignUpForm.propTypes = {
    token: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};
