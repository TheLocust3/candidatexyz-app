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

        this.state = { errors: {} };

        this.state.reportTypes = _.filter(this.props.reportTypes[_.toLower(this.props.campaign.state)], (reportType) => { return reportType.officeType == this.props.campaign.officeType });
        this.state.reportType = ReportHelper.generateReportType(this.state.reportTypes[0], this.props.campaign);

        if (_.isEmpty(this.props.report)) {
            this.state.report = { official: false, reportType: this.state.reportTypes[0].value, beginningDate: new Date(), endingDate: new Date() };
        } else {
            this.state.regenerate = true;
            this.state.report = this.props.report;
        }

        this.state.lastReport = ReportHelper.lastOfficialReport(this.props.reports, this.props.reportClass);
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
        let reportType = ReportHelper.generateReportType(_.find(this.state.reportTypes, (reportType) => { return reportType.name == select.value }), this.props.campaign)

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

        let beginningDate = report.beginningDate;
        let endingDate = report.endingDate;

        if (this.state.regenerate) {
            beginningDate = report.data.beginning_date;
            endingDate = report.data.ending_date;

            ReportApi.destroy(report.id);
        }

        ReportApi.create(report.reportType, report.official, reportClass, { beginning_date: moment(beginningDate).format(), ending_date: moment(endingDate).format() }).then((response) => {
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
            <Select label='Report Type' onChange={(select) => this.handleReportTypeChange(select)} selectedIndex={_.findIndex(this.state.reportTypes, (reportType) => { return reportType.value == this.state.report.reportType })} disabled={this.state.regenerate}>
                {this.state.reportTypes.map((reportType) => {
                    if (reportType.reportClass != reportClass && !this.state.regenerate) return;

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

        let beginningDate = disabled ? this.state.lastReport.data.ending_date : this.state.report.beginningDate;
        beginningDate = this.state.regenerate ? this.state.report.data.beginning_date : beginningDate;

        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} top>
                <Checkbox label='Generate as official report?' onChange={this.handleOfficialCheck.bind(this)} defaultChecked={this.state.report.official} inputProps={{ disabled: this.state.regenerate }} />
                <br /><br />

                {this.renderReportTypeDropdown()}
                <br /><br /><br />

                <DatePicker label='Beginning Date:' value={beginningDate} onChange={(date) => { this.handleDateChange('beginningDate', date) }} style={{ display: 'inline-block' }} inputProps={{ disabled: disabled }} />
                <DatePicker label='Ending Date:' value={this.state.reportType.endingDate} onChange={(date) => { this.handleDateChange('endingDate', date) }} style={{ display: 'inline-block', marginLeft: '5%' }} inputProps={{ disabled: true }} />
                <br /><br />

                <Button>{this.state.regenerate ? 'Regenerate' : 'Generate'}</Button>

                <MDCAutoInit />
            </Form>
        );
    }
}

ReportForm.propTypes = {
    reportTypes: PropTypes.object.isRequired,
    report: PropTypes.object,
    reports: PropTypes.array.isRequired,
    campaign: PropTypes.object.isRequired,
    reportClass: PropTypes.string
};
