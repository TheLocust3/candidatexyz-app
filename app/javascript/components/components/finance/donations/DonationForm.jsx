import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { ReceiptApi, DonorHelper } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history, STATES, RECEIPT_TYPES, OCCUPATION_AMOUNT_THRESHOLD } from '../../../../constants';
import { arraysEquals } from '../../../../helpers';

import AddressInput from '../../common/AddressInput';
import AutoCompleteTextField from '../../common/AutoCompleteTextField';
import DatePicker from '../../common/DatePicker';

export default class DonationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { donors: DonorHelper.generateDonorsInYear(this.props.receipts), donor: { amount: 0 }, occupationRequired: false, errors: {} };
        if (_.isEmpty(this.props.receipt)) {
            this.state.receipt = { receiptType: RECEIPT_TYPES[0].value, state: 'MA', country: 'United States', dateReceived: new Date() };
        } else {
            this.state.receipt = this.props.receipt;
        }
    }

    componentDidUpdate() {
        if (_.isEmpty(this.state.donor)) return;

        let amount = this.state.donor.amount + Number(this.state.receipt.amount);
        if (amount >= OCCUPATION_AMOUNT_THRESHOLD && !this.state.occupationRequired) {
            this.setState({
                occupationRequired: true
            });
        } else if (amount < OCCUPATION_AMOUNT_THRESHOLD && this.state.occupationRequired) {
            this.setState({
                occupationRequired: false
            });
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

    handleReceiptTypeChange(select) {
        let receipt = this.state.receipt;
        receipt.receiptType = _.find(RECEIPT_TYPES, (receiptType) => { return receiptType.label == select.value }).value;

        this.setState({
            receipt: receipt
        });
    }

    handleAddressChange(name, value) {
        let receipt = this.state.receipt;
        receipt[name] = value;

        this.setState({
            receipt: receipt
        });
    }

    handleSubmit(event) {
        let receipt = this.state.receipt;

        if (_.isEmpty(this.props.receipt)) {
            ReceiptApi.create(receipt.name, receipt.receiptType, receipt.amount, receipt.address, receipt.city, receipt.state, receipt.country, receipt.dateReceived, receipt.occupation, receipt.employer, receipt.email, receipt.phoneNumber).then((response) => {
                history.push(`/finance/donations/${response.id}`);
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            ReceiptApi.update(this.props.receipt.id, receipt.name, receipt.receiptType, receipt.amount, receipt.address, receipt.city, receipt.state, receipt.country, receipt.dateReceived, receipt.occupation, receipt.employer, receipt.email, receipt.phoneNumber).then((response) => {
                history.push(`/finance/donations/${this.props.receipt.id}`);
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
            receipt: { ...receipt, ...this.state.receipt, name: receipt.name },
            donor: _.find(this.state.donors, (donor) => { return donor.name == receipt.name })
        });
    }

    renderReceiptTypeDropdown() {
        if (this.props.receiptType == 'donation') return;

        return (
            <div>
                <Select label='Type' onChange={(select) => this.handleReceiptTypeChange(select)} selectedIndex={_.findIndex(RECEIPT_TYPES, (receiptType) => { return receiptType.value == this.state.receipt.receiptType })} style={{ width: '30%', marginRight: '5%' }}>
                    {RECEIPT_TYPES.map((receiptType) => {
                        return (
                            <SelectItem key={receiptType.value}>
                                {receiptType.label}
                            </SelectItem>
                        );
                    })}
                </Select>
            </div>
        );
    }

    renderDonationFields() {
        if (this.props.receiptType != 'donation') return;

        return (
            <div>
                <TextField type='email' label='Email' name='email' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.email} style={{ width: '57.5%', marginRight: '5%' }} />
                <TextField label='Phone Number' name='phoneNumber' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.phoneNumber} style={{ width: '37.5%' }} />
            </div>
        );
    }

    render() {
        let amount = _.isUndefined(this.state.receipt.amount) ? null : String(this.state.receipt.amount);

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                {this.renderReceiptTypeDropdown()}
                
                <AutoCompleteTextField elements={this.props.receipts} elementKey='name' label='Name' name='name' onChange={this.handleChange.bind(this)} onAutoComplete={(element) => this.onAutoComplete(element)} defaultValue={this.state.receipt.name} required /><br />

                <AddressInput address={this.state.receipt.address} city={this.state.receipt.city} state={this.state.receipt.state} country={this.state.receipt.country} onChange={(name, value) => this.handleAddressChange(name, value)} required />
                <br /><br />

                <DatePicker label='Date Received:' defaultValue={this.state.receipt.dateReceived} onChange={(date) => { this.handleDateChange(date) }} style={{ display: 'inline-block' }} />
                <TextField type='number' label='Amount ($)' name='amount' step='0.01' onChange={this.handleChange.bind(this)} defaultValue={amount} style={{ width: 'auto', marginLeft: '5%' }} required /><br />

                {this.renderDonationFields()}

                <TextField label='Occupation' name='occupation' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.occupation} style={{ width: '47.5%', marginRight: '5%' }} required={this.state.occupationRequired} />
                <TextField label='Employer' name='employer' onChange={this.handleChange.bind(this)} defaultValue={this.state.receipt.employer} style={{ width: '47.5%' }} required={this.state.occupationRequired} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

DonationForm.propTypes = {
    receipt: PropTypes.object,
    receipts: PropTypes.array.isRequired,
    receiptType: PropTypes.string
};
