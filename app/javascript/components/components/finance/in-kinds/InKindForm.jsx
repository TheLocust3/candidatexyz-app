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
import { InKindApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES } from '../../../../constants';

import AutoCompleteTextField from '../../common/AutoCompleteTextField';

export default class InKindForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.inKind)) {
            this.state.inKind = { state: 'MA', country: 'United States', dateReceived: new Date() };
        } else {
            this.state.inKind = this.props.inKind;
        }
    }

    handleChange(event) {
        let inKind = this.state.inKind;
        inKind[event.target.name] = event.target.value;

        this.setState({
            inKind: inKind
        });
    }

    handleDateChange(date) {
        let inKind = this.state.inKind;
        inKind.datePaid = date;

        this.setState({
            inKind: inKind
        });
    }

    handleStateChange(select) {
        let inKind = this.state.inKind;
        inKind.state = select.value;

        this.setState({
            inKind: inKind
        });
    }

    handleSubmit(event) {
        let inKind = this.state.inKind;

        if (_.isEmpty(this.props.inKind)) {
            InKindApi.create(inKind.fromWhom, inKind.description, inKind.address, inKind.city, inKind.state, inKind.country, inKind.dateReceived, inKind.value, inKind.email, inKind.phoneNumber).then((response) => {
                history.push(`/finance/in-kinds/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            InKindApi.update(this.props.inKind.id, inKind.fromWhom, inKind.description, inKind.address, inKind.city, inKind.state, inKind.country, inKind.dateReceived, inKind.value, inKind.email, inKind.phoneNumber).then((response) => {
                history.push(`/finance/in-kinds/${this.props.inKind.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(inKind) {
        inKind.value = '';

        this.setState({
            inKind: { ...inKind, ...this.state.inKind, name: inKind.name }
        });
    }

    renderStateDropdown() {
        return (
            <Select label='State' onChange={(select) => this.handleStateChange(select)} selectedIndex={_.findIndex(STATES, (state) => { return state == this.state.inKind.state })} style={{ width: '30%', marginRight: '5%' }}>
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
        let value = _.isUndefined(this.state.inKind.value) ? null : String(this.state.inKind.value);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <AutoCompleteTextField elements={this.props.inKinds} elementKey='fromWhom' label='From Whom' name='fromWhom' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.inKind.fromWhom} style={{ width: '100%' }} required /><br />

                <TextField label='Description' name='description' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.description} style={{ width: '100%' }} required /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.address} style={{ width: '100%' }} required /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.city} style={{ width: '30%', marginRight: '5%' }} required />
                {this.renderStateDropdown()}
                <TextField label='Country' name='country' onChange={this.handleChange.bind(this)} value={this.state.inKind.country} style={{ width: '30%' }} required /><br /><br />

                <Text type='body2' style={{ display: 'inline-block' }}>
                    Date Received:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.inKind.dateReceived)}`} onDayChange={(date) => this.handleDateChange(date)} /><br />
                </Text>
                <TextField type='number' label='Value ($)' name='value' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={value} style={{ width: 'auto', marginLeft: '5%' }} required /><br />

                <TextField type='email' label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.email} style={{ width: '57.5%', marginRight: '5%' }} />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.inKind.phoneNumber} style={{ width: '37.5%' }} />
                <br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

InKindForm.propTypes = {
    inKind: PropTypes.object,
    inKinds: PropTypes.array.isRequired
};
