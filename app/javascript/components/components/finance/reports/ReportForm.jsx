import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReportApi, ReportHelper } from 'candidatexyz-common-js';
import { Button, Checkbox, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

import DatePicker from '../../common/DatePicker';

export default class ReportForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { reportType: ReportHelper.generateReportType(this.props.reportTypes.ma[0], this.props.campaign), report: {
            official: false, reportType: this.props.reportTypes.ma[0].value, beginningDate: new Date(), endingDate: new Date()
        }, errors: {} };

        this.state.lastReport = ReportHelper.lastOfficialReport(this.props.reports);
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
        let reportType = ReportHelper.generateReportType(_.find(this.props.reportTypes.ma, (reportType) => { return reportType.name == select.value }), this.props.campaign)

        let report = this.state.report;
        report.reportType = reportType.value;

        this.setState({
            report: report,
            reportType: reportType
        });
    }

    handleOfficialCheck(event) {
        let report = this.state.report;
        report.official = !report.official;
        report.beginningDate = new Date();

        if (!_.isUndefined(this.state.lastReport) && report.official) {
            report.beginningDate = this.state.lastReport.endingDate;
        }

        this.setState({
            report: report 
        });
    }

    handleSubmit(event) {
        let report = this.state.report;
        let reportClass = _.isEmpty(this.props.reportClass) ? 'finance' : this.props.reportClass;

        ReportApi.create(report.reportType, report.official, reportClass, { beginning_date: moment(report.beginningDate).format(), ending_date: moment(this.state.reportType.endingDate).format() }).then((response) => {
            history.push(`/finance/reports/${response.id}`);
        }).catch((response) => {
            this.setState({
                errors: response.responseJSON.errors
            });
        });
    }

    renderReportTypeDropdown() {
        let reportClass = _.isEmpty(this.props.reportClass) ? 'finance' : this.props.reportClass;

        return (
            <Select label='Report Type' onChange={(select) => this.handleReportTypeChange(select)} selectedIndex={_.findIndex(this.props.reportTypes.ma, (reportType) => { return reportType.value == this.state.report.reportType })}>
                {this.props.reportTypes.ma.map((reportType) => {
                    if (reportType.reportClass != reportClass) return;

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
        let disabled = !_.isUndefined(this.state.lastReport) && this.state.report.official;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <Checkbox label='Generate as official report?' onChange={this.handleOfficialCheck.bind(this)} defaultChecked={this.state.report.official} />
                <br /><br />

                {this.renderReportTypeDropdown()}
                <br /><br /><br />

                <DatePicker label='Beginning Date:' value={disabled ? this.state.lastReport.endingDate : this.state.report.beginningDate} onChange={(date) => { this.handleDateChange('beginningDate', date) }} style={{ display: 'inline-block' }} inputProps={{ disabled: disabled }} />
                <DatePicker label='Ending Date:' value={this.state.reportType.endingDate} onChange={(date) => { this.handleDateChange('endingDate', date) }} style={{ display: 'inline-block', marginLeft: '5%' }} inputProps={{ disabled: true }} />
                <br /><br />

                <Button>Generate</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

ReportForm.propTypes = {
    reportTypes: PropTypes.object.isRequired,
    reports: PropTypes.array.isRequired,
    campaign: PropTypes.object.isRequired,
    reportClass: PropTypes.string
};
