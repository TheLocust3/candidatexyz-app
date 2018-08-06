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

    renderCity() {
        if (!_.includes(this.props.inputs, 'city')) return;

        return <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.props.city} style={{ width: '30%', marginRight: '5%' }} required={this.props.required} />;
    }

    renderStateDropdown() {
        if (!_.includes(this.props.inputs, 'state')) return;

        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.props.state })} style={{ width: '30%', marginRight: '5%' }} required={this.props.required}>
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

        return <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.props.country} style={{ width: '30%' }} required={this.props.required} />;
    }

    renderZipcode() {
        if (!_.includes(this.props.inputs, 'zipcode')) return;

        let width = this.props.hideCountry ? '30%' : '100%' ;

        return <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.zipcode} style={{ width: width }} required={this.props.required} />;
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
    required: PropTypes.bool
};
