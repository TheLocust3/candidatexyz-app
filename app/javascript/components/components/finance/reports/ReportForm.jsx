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
import { ReportApi } from 'candidatexyz-common-js';
import { Text, Button, Checkbox, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

export default class ReportForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { report: { official: false, reportType: this.props.reportTypes.ma[0].value, beginningDate: new Date(), endingDate: new Date() }, errors: {} };
    }

    handleChange(event) {
        let report = this.state.report;
        report[event.target.name] = event.target.value;

        this.setState({
            report: report
        });
    }

    handleDateChange(name, date) {
        let report = this.state.report;
        report[name] = date;

        this.setState({
            report: report
        });
    }

    handleReportTypeChange(select) {
        let report = this.state.report;
        report.reportType = _.filter(this.props.reportTypes.ma, (reportType) => { return reportType.name = select.value })[0].value;

        this.setState({
            report: report
        });
    }

    handleOfficialCheck(event) {
        let report = this.state.report;
        report.official = !report.official;

        this.setState({
            report: report
        });
    }

    handleSubmit(event) {
        let report = this.state.report;

        ReportApi.create(report.reportType, report.beginningDate, report.endingDate, report.official).then((response) => {
            history.push(`/finance/reports/${response.id}`);
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderReportTypeDropdown() {
        return (
            <Select label='Report Type' onChange={(select) => this.handleReportTypeChange(select)} selectedIndex={_.findIndex(this.props.reportTypes.ma, (reportType) => { return reportType.value == this.state.report.reportType })}>
                {this.props.reportTypes.ma.map((reportType) => {
                    return (
                        <SelectItem key={reportType.value}>
                            {reportType.name}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <Checkbox label='Generate as official report?' onChange={this.handleOfficialCheck.bind(this)} defaultChecked={this.state.report.official} />
                <br /><br />

                {this.renderReportTypeDropdown()}
                <br /><br /><br />

                <Text type='body2' style={{ display: 'inline-block' }}>
                    Beginning Date:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.report.beginningDate)}`} onDayChange={(date) => this.handleDateChange('beginningDate', date)} /><br />
                </Text>
                
                <Text type='body2' style={{ display: 'inline-block', marginLeft: '5%' }}>
                    Ending Date:

                    <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                        formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.report.endingDate)}`} onDayChange={(date) => this.handleDateChange('endingDate', date)} /><br />
                </Text>
                <br /><br />

                <Button>Generate</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

ReportForm.propTypes = {
    reportTypes: PropTypes.object.isRequired
};
