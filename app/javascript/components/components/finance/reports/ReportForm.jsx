import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { ReportApi, ReportHelper } from 'candidatexyz-common-js';
import { Text, Button, Checkbox, Form, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';

import DatePicker from '../../common/DatePicker';

export default class ReportForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { reportType: ReportHelper.generateReportType(this.props.reportTypes.ma[0], this.props.campaign), report: {
            official: false, reportType: this.props.reportTypes.ma[0].value, beginningDate: new Date(), endingDate: new Date()
        }, errors: {} };
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

                <DatePicker label='Beginning Date:' defaultValue={this.state.report.beginningDate} onChange={(date) => { this.handleDateChange('beginningDate', date) }} style={{ display: 'inline-block' }} />
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
    campaign: PropTypes.object.isRequired
};
