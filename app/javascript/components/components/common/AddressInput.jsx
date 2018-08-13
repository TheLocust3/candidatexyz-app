import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { STATES } from '../../../constants';

export default class AddressInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = { address: this.props.address, city: this.props.city, state: this.props.state, country: this.props.country, zipcode: this.props.zipcode };

        let campaign = this.props.campaign;
        if (!_.isEmpty(campaign)) {
            this.state.city = campaign.city;
            this.state.state = campaign.state;
            this.state.country = campaign.country;

            this.props.onChange('city', this.state.city);
            this.props.onChange('state', this.state.state);
        }

        if (_.isEmpty(this.state.country)) {
            this.props.onChange('country', 'United States');
        } else {
            this.props.onChange('country', this.state.country);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            address: nextProps.address,
            city: nextProps.city,
            state: nextProps.state,
            country: nextProps.country,
            zipcode: nextProps.zipcode
        });
    }

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    handleStateChange(select) {
        this.props.onChange('state', select.value);
    }

    renderAddress() {
        if (!_.includes(this.props.inputs, 'address')) return;

        return (
            <div>
                <TextField label='Mailing Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.address} required={this.props.required} />
                <br />
            </div>
        );
    }

    renderCity() {
        if (!_.includes(this.props.inputs, 'city')) return;

        let style = { width: '30%', marginRight: '5%' };
        style = !_.includes(this.props.inputs, 'country') && !_.includes(this.props.inputs, 'zipcode') ? { width: '47.5%', marginRight: '5%' } : style;

        return <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.city} style={style} required={this.props.required} />;
    }

    renderStateDropdown() {
        if (!_.includes(this.props.inputs, 'state')) return;

        let style = { width: '30%', marginRight: '5%' };
        style = !_.includes(this.props.inputs, 'country') && !_.includes(this.props.inputs, 'zipcode') ? { width: '47.5%' } : style;

        return (
            <Select label='State*' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.state })} style={style} required={this.props.required}>
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

    renderCountry() {
        if (!_.includes(this.props.inputs, 'country')) return;

        return <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.state.country} style={{ width: '30%' }} required={this.props.required} />;
    }

    renderZipcode() {
        if (!_.includes(this.props.inputs, 'zipcode')) return;

        let width = !_.includes(this.props.inputs, 'country') ? '30%' : '100%' ;

        return <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.state.zipcode} style={{ width: width }} required={this.props.required} />;
    }

    render() {
        return (
            <div>
                {this.renderAddress()}
                {this.renderCity()}
                {this.renderStateDropdown()}
                {this.renderCountry()}
                {this.renderZipcode()}

                <MDCAutoInit />
            </div>
        );
    }
}

AddressInput.propTypes = {
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    inputs: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    campaign: PropTypes.object
};
