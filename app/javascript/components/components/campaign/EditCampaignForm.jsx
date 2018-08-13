import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CampaignApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import DatePicker from '../common/DatePicker';
import AddressInput from '../common/AddressInput';

let OFFICE_TYPES = ['Municipal', 'State', 'Country'];

export default class EditCampaignForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { campaign: this.props.campaign, errors: {} };

        if (_.isEmpty(this.state.campaign.electionDay)) {
            this.state.campaign.electionDay = new Date();
        }

        if (_.isEmpty(this.state.campaign.preliminaryDay)) {
            this.state.campaign.preliminaryDay = new Date();
        }
    }

    handleChange(event) {
        let campaign = this.state.campaign;
        campaign[event.target.name] = event.target.value;

        this.setState({
            campaign: campaign
        });
    }

    handleAddressChange(name, value) {
        let campaign = this.state.campaign;
        campaign[name] = value;

        this.setState({
            campaign: campaign
        });
    }

    handleDateChange(name, date) {
        let campaign = this.state.campaign;
        campaign[name] = date;

        this.setState({
            campaign: campaign
        });
    }

    handleOfficeTypeChange(select) {
        let campaign = this.state.campaign;
        campaign.officeType = select.value;

        this.setState({
            campaign: campaign
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        CampaignApi.update(this.props.campaign.id, this.state.campaign.name, this.state.campaign.url, this.state.campaign.electionDay, this.state.campaign.preliminaryDay, this.state.campaign.city, this.state.campaign.state, this.state.campaign.country, this.state.campaign.officeType).then((response) => {
            history.push('/');
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderOfficeTypeDropdown() {
        return (
            <Select label='Office Type' onChange={(select) => this.handleOfficeTypeChange(select)} selectedIndex={_.findIndex(OFFICE_TYPES, (officeType) => { return officeType == this.props.campaign.officeType })} style={{ width: '30%' }}>
                {OFFICE_TYPES.map((officeType) => {
                    return (
                        <SelectItem key={officeType}>
                            {officeType}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.props.campaign.name} />
                <br />

                <TextField label='Website URL' name='url' onChange={this.handleChange.bind(this)} defaultValue={this.props.campaign.url} />
                <br />

                <AddressInput city={this.state.campaign.city} state={this.state.campaign.state} country={this.state.campaign.country} inputs={['city', 'state']} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <br />

                {this.renderOfficeTypeDropdown()}
                <br /><br />

                <DatePicker label='Preliminary Election Day:' defaultValue={this.state.campaign.preliminaryDay} onChange={(date) => { this.handleDateChange('preliminaryDay', date) }} style={{ display: 'inline-block', marginRight: '5%' }} />
                <DatePicker label='Election Day:' defaultValue={this.state.campaign.electionDay} onChange={(date) => { this.handleDateChange('electionDay', date) }} style={{ display: 'inline-block' }} />
                <br /><br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

EditCampaignForm.propTypes = {
    campaign: PropTypes.object.isRequired
};
