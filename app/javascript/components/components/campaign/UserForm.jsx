import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Checkbox, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../constants';

import AddressInput from '../common/AddressInput';

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { user: { position: '', positionOther: '', state: 'MA', country: 'United States' }, errors: {} };

        if (!_.isEmpty(this.props.user)) {
            this.state.user = this.props.user;
        }
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

    handlePositionChange(select) {
        let user = this.state.user;
        user.position = select.value;

        this.setState({
            user: user
        });
    }

    handleAddressChange(name, value) {
        let user = this.state.user;
        user[name] = value;

        this.setState({
            user: user
        });
    }

    handleSubmit(event) {
        let position = this.state.user.position;
        if (this.state.user.position == 'Other PAC Officer' || _.findIndex(this.props.positions, (position) => { return position.name == this.state.user.position }) == -1) {
            position = this.state.user.positionOther
        }

        StaffApi.update(this.props.user.id, this.state.user.email, this.state.user.firstName, this.state.user.lastName, this.state.user.admin, position, this.state.user.address, this.state.user.city, this.state.user.state, this.state.user.country, this.state.user.zipcode, this.state.user.phoneNumber, this.state.user.party).then((response) => {
            history.push(`/campaign/staff/${this.props.user.id}`)
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderPositionTextbox() {
        if (this.state.user.position != 'Other PAC Officer' && _.findIndex(this.props.positions, (position) => { return position.name == this.state.user.position }) != -1) return;

        return (
            <div>
                <TextField label='Position' name='positionOther' onChange={this.handleChange.bind(this)} defaultValue={this.state.user.position} style={{ width: '100%' }} />
            </div>
        );
    }

    renderPositionDropdown() {
        let index = _.findIndex(this.props.positions, (position) => { return position.name == this.state.user.position });
        index = index == -1 ? _.findIndex(this.props.positions, (position) => { return position.name == 'Other PAC Officer' }) : index;

        return (
            <div>
                <Select label='Position' onChange={(select) => this.handlePositionChange(select)} selectedIndex={index} style={{ minWidth: '30%' }}>
                    {this.props.positions.map((position, index) => {
                        return (
                            <SelectItem key={index}>
                                {position.name}
                            </SelectItem>
                        );
                    })}
                </Select>

                {this.renderPositionTextbox()}
            </div>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Email' type='email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.email} style={{ width: '100%' }} /><br /><br />

                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.firstName} style={{ width: '100%' }} /><br />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.lastName} style={{ width: '100%' }} /><br /><br />

                <AddressInput address={this.state.user.address} city={this.state.user.city} state={this.state.user.state} country={this.state.user.country} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.zipcode} style={{ width: '100%' }} required /><br /><br />

                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.phoneNumber} style={{ width: '100%' }} /><br />
                <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} defaultValue={this.props.user.party} style={{ width: '100%' }} /><br /><br />

                {this.renderPositionDropdown()}<br />
                <Checkbox label='Admin' onChange={this.handleAdminCheck.bind(this)} defaultChecked={this.props.user.admin} /><br /><br /><br />

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
