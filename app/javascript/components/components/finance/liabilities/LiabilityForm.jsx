import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import { LiabilityApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

import AutoCompleteTextField from '../../common/AutoCompleteTextField';

export default class LiabilityForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.liability)) {
            this.state.liability = { state: 'MA', country: 'United States', dateIncurred: new Date() };
        } else {
            this.state.liability = this.props.liability;
        }
    }

    handleChange(event) {
        let liability = this.state.liability;
        liability[event.target.name] = event.target.value;

        this.setState({
            liability: liability
        });
    }

    handleDateChange(date) {
        let liability = this.state.liability;
        liability.datePaid = date;

        this.setState({
            liability: liability
        });
    }

    handleStateChange(select) {
        let liability = this.state.liability;
        liability.state = select.value;

        this.setState({
            liability: liability
        });
    }

    handleSubmit(event) {
        let liability = this.state.liability;

        if (_.isEmpty(this.props.liability)) {
            LiabilityApi.create(liability.toWhom, liability.purpose, liability.address, liability.city, liability.state, liability.country, liability.dateIncurred, liability.amount).then((response) => {
                history.push(`/finance/liabilities/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            LiabilityApi.update(this.props.liability.id, liability.toWhom, liability.purpose, liability.address, liability.city, liability.state, liability.country, liability.dateIncurred, liability.amount).then((response) => {
                history.push(`/finance/liabilities/${this.props.liability.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(liability) {
        liability.amount = '';

        this.setState({
            liability: { ...liability, ...this.state.liability, name: liability.name }
        });
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.liability.state })} style={{ width: '30%', marginRight: '5%' }}>
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
        let amount = _.isUndefined(this.state.liability.amount) ? null : String(this.state.liability.amount);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <AutoCompleteTextField elements={this.props.liabilities} elementKey='toWhom' label='To Whom' name='toWhom' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.liability.toWhom} style={{ width: '100%' }} required /><br />

                <TextField label='Purpose' name='purpose' onChange={this.handleChange.bind(this)} defaultValue={this.state.liability.purpose} style={{ width: '100%' }} required /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.liability.address} style={{ width: '100%' }} required /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.liability.city} style={{ width: '30%', marginRight: '5%' }} required />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} value={this.state.liability.country} style={{ width: '30%' }} required /><br /><br />

                <Text type='body2' style={{ display: 'inline-block' }}>
                    Date Incurred:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.liability.dateIncurred)}`} onDayChange={(date) => this.handleDateChange(date)} /><br />
                </Text>
                <TextField type='number' label='Amount ($)' name='amount' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={amount} style={{ width: 'auto', marginLeft: '5%' }} required />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

LiabilityForm.propTypes = {
    liability: PropTypes.object,
    liabilities: PropTypes.array.isRequired
};
