import React from 'react';
import PropTypes from 'prop-types';
import { CampaignApi } from 'candidatexyz-common-js';

import { history } from '../../../constants';

import Form from '../common/Form';
import TextField from '../common/TextField';
import Button from '../common/Button';

export default class EditCampaignForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { campaign: this.props.campaign, errors: {} };
    }

    handleChange(event) {
        let campaign = this.state.campaign;
        campaign[event.target.name] = event.target.value;

        this.setState({
            campaign: campaign
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        CampaignApi.update(this.props.campaign.id, this.state.campaign.name).then((response) => {
            history.push('/');
        }).catch((response) => {
            console.log(response)
            this.setState({
                errors: { error: response.responseJSON.errors }
            });
        });
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.props.campaign.name} style={{ width: '100%' }} /><br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

EditCampaignForm.propTypes = {
    campaign: PropTypes.object.isRequired
};
