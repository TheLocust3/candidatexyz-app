import React from 'react';
import PropTypes from 'prop-types';
import { StaffApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import Loader from '../common/Loader';

export default class InviteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { email: '', position: '', sending: false, errors: {} };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlePositionChange(select) {
        this.setState({
            position: select.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({
            sending: true
        });

        StaffApi.createToken(this.state.email, this.state.position).then(() => {
            history.push('/campaign/staff');
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderPositionDropdown() {
        return (
            <Select label='Position' onChange={(select) => this.handlePositionChange(select)} selectedIndex={_.findIndex(this.props.positions, (position) => { return position.name == this.state.position })} style={{ minWidth: '30%' }}>
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
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <Loader isReady={!this.state.sending}>
                    <TextField type='email' label='Email' name='email' onChange={(event) => this.handleChange(event)} required={true} />
                    <br /><br />
                    
                    {this.renderPositionDropdown()}
                    <br /><br />
                    
                    <Button type='submit'>Invite</Button>
                </Loader>
            </Form>
        );
    }
}

InviteForm.propTypes = {
    positions: PropTypes.array.isRequired
};
