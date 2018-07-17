import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CampaignApi } from 'candidatexyz-common-js';
import { Button, Form, TextField } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

import DatePicker from '../common/DatePicker';

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

    handleDateChange(name, date) {
        let campaign = this.state.campaign;
        campaign[name] = date;

        this.setState({
            campaign: campaign
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        CampaignApi.update(this.props.campaign.id, this.state.campaign.name, this.state.campaign.url, this.state.campaign.electionDay, this.state.campaign.preliminaryDay).then((response) => {
            history.push('/');
        }).catch((response) => {
            this.setState({
                errors: { error: response.responseJSON.errors }
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.props.campaign.name} style={{ width: '100%' }} />
                <br />

                <TextField label='Website URL' name='url' onChange={this.handleChange.bind(this)} defaultValue={this.props.campaign.url} style={{ width: '100%' }} />
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
