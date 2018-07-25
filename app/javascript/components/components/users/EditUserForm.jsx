import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import AddressInput from '../common/AddressInput';
import FullNameInput from '../common/FullNameInput';

export default class EditUserForm extends React.Component {

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

    handlePositionChange(select) {
        let user = this.state.user;
        user.position = select.value;

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

        let position = user.position;
        if (user.position == 'Other PAC Officer' || _.findIndex(this.props.positions, (position) => { return position.name == user.position }) == -1) {
            position = user.positionOther
        }

        AuthApi.editUser(user.email, user.password, user.passwordConfirmation, user.firstName, user.lastName, user.address, user.city, user.state, user.country, user.zipcode, user.phoneNumber, user.party, position).then((response) => {
            if (_.isEmpty(this.props.redirect)) {
                window.location.href = '/';
            } else {
                history.push(this.props.redirect);
            }
        }).catch((response) => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    renderPositionTextbox() {
        if (this.state.user.position != 'Other PAC Officer' && _.findIndex(this.props.positions, (position) => { return position.name == this.state.user.position }) != -1) return;

        return (
            <div>
                <TextField label='Position' name='positionOther' onChange={this.handleChange.bind(this)} defaultValue={this.state.user.position} />
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

    renderInitial() {
        if (this.props.initialEdit) {
            return this.renderPositionDropdown();
        }

        return (
            <div>
                <TextField type='password' label='New Password' name='password' onChange={this.handleChange.bind(this)} /><br />
                <TextField type='password' label='Confirm New Password' name='passwordConfirmation' onChange={this.handleChange.bind(this)} /><br />
            </div>
        );
    }

    render() {
        let user = this.state.user;
        
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <FullNameInput firstName={user.firstName} lastName={user.lastName} onChange={(name, value) => this.handleGenericChange(name, value)} required /><br />

                <TextField label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={user.email} /><br />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={user.phoneNumber} /><br /><br />

                <AddressInput address={user.address} city={user.city} state={user.state} country={user.country} zipcode={user.zipcode} showZipcode={true} onChange={(name, value) => this.handleGenericChange(name, value)} /><br />

                <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} defaultValue={user.party} /><br /><br />

                {this.renderInitial()}
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

EditUserForm.propTypes = {
    user: PropTypes.object.isRequired,
    positions: PropTypes.array,
    editingSelf: PropTypes.bool,
    redirect: PropTypes.string,
    initialEdit: PropTypes.bool
};
