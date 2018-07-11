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
import { DonorApi } from 'candidatexyz-common-js';
import { Text, Button, TextField, Form, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

export default class DonorForm extends React.Component {

    constructor(props) {
        super(props);

        if (_.isEmpty(this.props.donor)) {
            this.state = { donor: { dateReceived: new Date() }, errors: {} };
        } else {
            this.state = { donor: this.props.donor, errors: {} };
        }
    }

    handleChange(event) {
        let donor = this.state.donor;
        donor[event.target.name] = event.target.value;

        this.setState({
            donor: donor
        });
    }

    handleDateChange(date) {
        let donor = this.state.donor;
        donor.dateReceived = date;

        this.setState({
            donor: donor
        });

        console.log(donor)
    }

    handleSubmit(event) {
        let donor = this.state.donor;

        if (_.isEmpty(this.props.donor)) {
            DonorApi.create(donor.name, donor.amount, donor.address, donor.zipcode, donor.city, donor.state, donor.dateReceived, donor.occupation, donor.employer).then((response) => {
                history.push(`/campaign/donors/${response.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        } else {
            DonorApi.update(this.props.donor.id, donor.name, donor.amount, donor.address, donor.zipcode, donor.city, donor.state, donor.dateReceived, donor.occupation, donor.employer).then((response) => {
                history.push(`/campaign/donors/${this.props.donor.id}`)
            }).catch((response) => {
                this.setState({
                    errors: response.responseJSON.errors
                });
            });
        }
    }

    formatDate(date, format, locale) {
        return moment(date).format(format);
    }

    render() {
        let amount = this.state.donor.amount;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <TextField label='Name' name='name' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.name} style={{ width: '100%' }} required /><br /><br />

                <TextField label='Address' name='address' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.address} style={{ width: '100%' }} required /><br />
                <TextField label='City' name='city' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.city} style={{ width: '30%', marginRight: '5%' }} required />
                <TextField label='State' name='state' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.state} style={{ width: '30%', marginRight: '5%' }} required />
                <TextField label='Zipcode' name='zipcode' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.zipcode} style={{ width: '30%' }} required /><br /><br />

                <Text type='body2' style={{ display: 'inline-block' }}>
                    Date Received:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.donor.dateReceived)}`} onDayChange={(date) => this.handleDateChange(date)} /><br />
                </Text>
                <TextField label='Amount' name='amount' onChange={this.handleChange.bind(this)} defaultValue={_.isEmpty(amount) ? '' : String(amount)} style={{ width: 'auto', marginLeft: '5%' }} required /><br /><br />


                <TextField label='Occupation' name='occupation' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.occupation} style={{ width: '47.5%', marginRight: '5%' }} />
                <TextField label='Employer' name='employer' onChange={this.handleChange.bind(this)} defaultValue={this.state.donor.employer} style={{ width: '47.5%' }} /><br /><br />

                <Button>Save</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

DonorForm.propTypes = {
    donor: PropTypes.object
};
