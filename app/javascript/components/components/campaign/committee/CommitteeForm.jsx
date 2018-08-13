import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CommitteeApi } from 'candidatexyz-common-js';
import { Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import AddressInput from '../../common/AddressInput';

export default class CommitteeForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { checklistComplete: false, errors: {} };
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

    handleAddressChange(name, value) {
        let committee = this.state.committee;
        committee[name] = value;

        this.setState({
            committee: committee
        });
    }

    handleSubmit(event) {
        let committee = this.state.committee;

        if (_.isEmpty(this.props.committee)) {
            CommitteeApi.create(committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.zipcode, committee.office, committee.district, committee.bank).then((response) => {
                window.location.reload();
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            CommitteeApi.destroy(this.props.committee.id).then(() => {
                CommitteeApi.create(committee.name, committee.email, committee.phoneNumber, committee.address, committee.city, committee.state, committee.country, committee.zipcode, committee.office, committee.district, committee.bank).then((response) => {
                    window.location.href = '/campaign';
                }).catch((response) => {
                    this.setState({
                        errors: response.responseJSON.errors
                    });
                });
            });
        }
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Committee Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.name} required /><br />
                <TextField label='Office' name='office' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.office} required /><br />
                <TextField label='District' name='district' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.district} required /><br /><br />

                <TextField type='email' label='Committee Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.email} required /><br />
                <TextField label='Committee Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.phoneNumber} required /><br /><br />

                <AddressInput address={this.props.recreate ? '' : this.state.committee.address} city={this.props.recreate ? '' : this.state.committee.city} state={this.props.recreate ? '' : this.state.committee.state}
                    country={this.props.recreate ? '' : this.state.committee.country} zipcode={this.props.recreate ? '' : this.state.committee.zipcode} campaign={this.props.campaign} inputs={['address', 'city', 'state', 'zipcode']}
                    onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br />

                <TextField label='Bank Name' name='bank' onChange={this.handleChange.bind(this)} defaultValue={this.props.recreate ? '' : this.state.committee.bank} required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

CommitteeForm.propTypes = {
    committee: PropTypes.object,
    campaign: PropTypes.object,
    recreate: PropTypes.bool
};
