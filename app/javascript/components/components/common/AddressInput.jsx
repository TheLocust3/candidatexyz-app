import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { STATES } from '../../../constants';

export default class AddressInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.address = _.isEmpty(this.props.address) ? '' : this.props.address;
        this.state.city = _.isEmpty(this.props.city) ? '' : this.props.city;
        this.state.state = _.isEmpty(this.props.state) ? '' : this.props.state;
        this.state.country = _.isEmpty(this.props.country) ? '' : this.props.country;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

        this.props.onChange(event.target.name, event.target.value);
    }

    handleStateChange(select) {
        this.setState({
            state: select.value
        });

        this.props.onChange('state', select.value);
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.state })} style={{ width: '30%', marginRight: '5%' }} required={this.props.required}>
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

    render() {
        return (
            <div>
                <TextField label='Mailing Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.address} style={{ width: '100%' }} required={this.props.required} /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.city} style={{ width: '30%', marginRight: '5%' }} required={this.props.required} />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} value={this.state.country} style={{ width: '30%' }} required={this.props.required} />

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
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};
