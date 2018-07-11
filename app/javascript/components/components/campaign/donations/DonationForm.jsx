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
import { ReceiptApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { arraysEquals } from '../../../../helpers';

import AutoCompleteTextField from '../../common/AutoCompleteTextField';

export default class DonationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { errors: {} };
        if (_.isEmpty(this.props.receipt)) {
            this.state.receipt = { dateReceived: new Date() };
        } else {
            this.state.receipt = this.props.receipt;
        }
    }

    handleChange(event) {
        let receipt = this.state.receipt;
        receipt[event.target.name] = event.target.value;

        this.setState({
            receipt: receipt
        });
    }

    handleDateChange(date) {
        let receipt = this.state.receipt;
        receipt.dateReceived = date;

        this.setState({
            receipt: receipt
        });
    }

    handleSubmit(event) {
        let receipt = this.state.receipt;

        if (_.isEmpty(this.props.receipt)) {
            ReceiptApi.create(receipt.name, receipt.amount, receipt.address, receipt.zipcode, receipt.city, receipt.state, receipt.dateReceived, receipt.occupation, receipt.employer).then((response) => {
                history.push(`/campaign/donations/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            ReceiptApi.update(this.props.receipt.id, receipt.name, receipt.amount, receipt.address, receipt.zipcode, receipt.city, receipt.state, receipt.dateReceived, receipt.occupation, receipt.employer).then((response) => {
                history.push(`/campaign/donations/${this.props.receipt.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    onAutoComplete(receipt) {
        receipt.amount = '';

        this.setState({
            receipt: { ...receipt, ...this.state.receipt }
        });
    }

    formatDate(date, format, locale) {
        return moment(date).format(format);
    }

    render() {
        let amount = this.state.receipt.amount;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <AutoCompleteTextField elements={this.props.receipts} elementKey='name' label='Name' name='name' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.receipt.name} style={{ width: '100%' }} required /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.address} style={{ width: '100%' }} required /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.city} style={{ width: '30%', marginRight: '5%' }} required />
                <TextField label='State' name='state' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.state} style={{ width: '30%', marginRight: '5%' }} required />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.zipcode} style={{ width: '30%' }} required /><br /><br />

                <Text type='body2' style={{ display: 'inline-block' }}>
                    Date Received:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.receipt.dateReceived)}`} onDayChange={(date) => this.handleDateChange(date)} /><br />
                </Text>
                <TextField label='Amount' name='amount' onChange={this.handleChange.bind(this)} defaultValue={_.isUndefined(amount) ? '' : String(amount)} style={{ width: 'auto', marginLeft: '5%' }} required /><br /><br />


                <TextField label='Occupation' name='occupation' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.occupation} style={{ width: '47.5%', marginRight: '5%' }} />
                <TextField label='Employer' name='employer' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.employer} style={{ width: '47.5%' }} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

DonationForm.propTypes = {
    receipt: PropTypes.object,
    receipts: PropTypes.array.isRequired
};
