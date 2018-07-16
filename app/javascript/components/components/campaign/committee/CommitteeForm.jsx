import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CommitteeApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

export default class CommitteeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.committee)) {
            this.state.committee = { state: 'MA', country: 'United States' };
        } else {
            this.state.committee = this.props.committee;
        }
    }

    handleChange(event) {
        let committee = this.state.committee;
        committee[event.target.name] = event.target.value;

        this.setState({
            committee: committee
        });
    }

    handleStateChange(select) {
        let committee = this.state.committee;
        committee.state = select.value;

        this.setState({
            committee: committee
        });
    }

    handleSubmit(event) {
        let committee = this.state.committee;

        if (_.isEmpty(this.props.committee)) {
            CommitteeApi.create(committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.office, committee.district).then((response) => {
                history.push('/campaign/committee');
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            CommitteeApi.update(this.props.committee.id, committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.office, committee.district).then((response) => {
                history.push('/campaign/committee');
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.committee.state })} style={{ width: '30%', marginRight: '5%' }}>
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

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Committee Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.name} style={{ width: '100%' }} required /><br />
                <TextField label='Office' name='office' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.office} style={{ width: '100%' }} required /><br />
                <TextField label='District' name='district' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.district} style={{ width: '100%' }} required /><br /><br />

                <TextField type='email' label='Committee Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.email} style={{ width: '100%' }} required /><br />
                <TextField label='Committee Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.phoneNumber} style={{ width: '100%' }} required /><br /><br />

                <TextField label='Mailing Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.address} style={{ width: '100%' }} required /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.committee.city} style={{ width: '30%', marginRight: '5%' }} required />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} value={this.state.committee.country} style={{ width: '30%' }} required /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

CommitteeForm.propTypes = {
    committee: PropTypes.object
};
