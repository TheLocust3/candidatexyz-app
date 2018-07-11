import React from 'react';
import PropTypes from 'prop-types';
import { AuthApi } from 'candidatexyz-common-js';
import { Form, TextField, Button, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

export default class SuperuserForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { campaign: this.props.user.email, campaignId: this.props.user.campaignId, errors: {} };
    }

    handleChange(select) {
        this.setState({
            campaignId: _.find(this.props.campaigns, (campaign) => { return campaign.name == select.value }).id
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        AuthApi.setCampaignId(this.state.campaignId).then((response) => {
            window.location.href = '/';
        }).catch((response) => {
            this.setState({
                errors: { error: response.data.errors }
            });
        });
    }

    renderCampaignDropdown() {
        return (
            <Select label='Campaign' selectedIndex={_.findIndex(this.props.campaigns, (campaign) => { return campaign.id == this.state.campaignId })} onChange={(select) => this.handleChange(select)} style={{ width: '30%' }}>
                {_.map(this.props.campaigns, (campaign) => {
                    return (
                        <SelectItem key={campaign.id}>
                            {campaign.name}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                {this.renderCampaignDropdown()}<br />
                
                <Button type='submit' className='right-form-button'>Save</Button>
            </Form>
        );
    }
}

SuperuserForm.propTypes = {
    user: PropTypes.object.isRequired,
    campaigns: PropTypes.array
};
