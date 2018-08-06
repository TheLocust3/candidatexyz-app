import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { STATES } from '../../../constants';

export default class AddressInput extends React.Component {

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
                <TextField label='Mailing Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.props.address} required={this.props.required} />
                <br />
            </div>
        );
    }

    renderCity(defaultCity) {
        if (!_.includes(this.props.inputs, 'city')) return;

        return <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={defaultCity} style={{ width: '30%', marginRight: '5%' }} required={this.props.required} />;
    }

    renderStateDropdown(defaultState) {
        if (!_.includes(this.props.inputs, 'state')) return;

        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == defaultState })} style={{ width: '30%', marginRight: '5%' }} required={this.props.required}>
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

    renderCountry(defaultCountry) {
        if (!_.includes(this.props.inputs, 'country')) return;

        return <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={defaultCountry} style={{ width: '30%' }} required={this.props.required} />;
    }

    renderZipcode() {
        if (!_.includes(this.props.inputs, 'zipcode')) return;

        let width = this.props.hideCountry ? '30%' : '100%' ;

        return <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.zipcode} style={{ width: width }} required={this.props.required} />;
    }

    render() {
        let city = this.props.city;
        let state = this.props.state;
        let country = this.props.country;

        if (!_.isEmpty(this.props.campaign)) {
            let campaign = this.props.campaign;

            city = campaign.city;
            state = campaign.state;
            country = campaign.country;
        }

        return (
            <div>
                {this.renderAddress()}
                {this.renderCity(city)}
                {this.renderStateDropdown(state)}
                {this.renderCountry(country)}
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
