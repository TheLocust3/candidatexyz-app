import React from 'react';
import PropTypes from 'prop-types';
import { CampaignApi, StaffApi } from 'candidatexyz-common-js';
import { Button, TextField, Form, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import DatePicker from '../common/DatePicker';
import AddressInput from '../common/AddressInput';

let OFFICE_TYPES = ['Municipal', 'State', 'Country'];

export default class CampaignForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { campaign: { state: 'MA', country: 'United States', officeType: 'Municipal', electionDay: new Date(), preliminaryDay: new Date() }, errors: {} };
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
        let campaign = this.state.campaign;

        CampaignApi.create(campaign.name, '', campaign.electionDay, campaign.preliminaryDay).then((response) => {
            StaffApi.updateCampaignId(this.props.user.id, response.id).then((response) => {
                history.push('/complete');
            });
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
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Name' name='name' onChange={this.handleChange.bind(this)} />
                <br /><br /><br />

                <AddressInput city={this.state.campaign.city} state={this.state.campaign.state} country={this.state.campaign.country} inputs={['city', 'state']} onChange={(name, value) => this.handleAddressChange(name, value)} />
                <br />

                {this.renderOfficeTypeDropdown()}
                <br /><br />

                <DatePicker label='Preliminary Election Day:' onChange={(date) => { this.handleDateChange('preliminaryDay', date) }} style={{ display: 'inline-block', marginRight: '5%' }} />
                <DatePicker label='Election Day:' onChange={(date) => { this.handleDateChange('electionDay', date) }} style={{ display: 'inline-block' }} />
                <br /><br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

CampaignForm.propTypes = {
    user: PropTypes.object.isRequired
};
