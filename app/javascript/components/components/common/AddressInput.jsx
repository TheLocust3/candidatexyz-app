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

    renderStateDropdown() {
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
        if (this.props.hideCountry) return;

        return <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} defaultValue={this.props.country} style={{ width: '30%' }} required={this.props.required} />;
    }

    renderZipcode() {
        if (!this.props.showZipcode) return

        let width = this.props.hideCountry ? '30%' : '100%' ;

        return <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.props.zipcode} style={{ width: width }} required={this.props.required} />;
    }

    render() {
        return (
            <div>
                <TextField label='Mailing Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.props.address} required={this.props.required} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.props.city} style={{ width: '30%', marginRight: '5%' }} required={this.props.required} />
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
    hideCountry: PropTypes.bool,
    showZipcode: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};
