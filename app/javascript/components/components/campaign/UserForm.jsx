import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Checkbox, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../constants';

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: { position: '', state: 'MA', country: 'United States', ...this.props.user }, errors: {} };
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

    handleStateChange(select) {
        let user = this.state.user;
        user.state = select.value;

        this.setState({
            user: user
        });
    }

    handlePositionChange(select) {
        let user = this.state.user;
        user.position = select.value;

        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        StaffApi.update(this.props.user.id, this.state.user.email, this.state.user.firstName, this.state.user.lastName, this.state.user.admin, this.state.user.position, this.state.user.address, this.state.user.city, this.state.user.state, this.state.user.country, this.state.user.phoneNumber).then((response) => {
            history.push(`/campaign/staff/${this.props.user.id}`)
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.user.state })} style={{ width: '30%', marginRight: '5%' }}>
                {STATES.map((state) => {
                    return (
                        <SelectItem key={state}>
                            {state}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    renderPositionDropdown() {
        return (
            <Select label='Position' onChange={(select) => this.handlePositionChange(select)} selectedIndex={_.findIndex(this.props.positions, (position) => { return position.name == this.state.user.position })} style={{ minWidth: '30%' }}>
                {this.props.positions.map((position, index) => {
                    return (
                        <SelectItem key={index}>
                            {position.name}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.email} style={{ width: '100%' }} /><br /><br />

                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.lastName} style={{ width: '100%' }} /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.user.address} style={{ width: '100%' }} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.user.city} style={{ width: '30%', marginRight: '5%' }} />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.state.user.country} style={{ width: '30%' }} /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.phoneNumber} style={{ width: '100%' }} /><br /><br />

                {this.renderPositionDropdown()}<br />
                <Checkbox label='Admin' onChange={this.handleAdminCheck.bind(this)} defaultChecked={this.props.user.admin} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

UserForm.propTypes = {
    user: PropTypes.object,
    positions: PropTypes.array.isRequired
};
