import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Report extends React.Component {

    renderLink() {
        if (this.props.report.status != 'done') return;

        return (
            <div>
                <Text type='body1'><a className='link' href={this.props.report.url}>View Report</a></Text>
                <br />
            </div>
        );
    }

    render() {
        let report = this.props.report;

        return (
            <div>
                {this.renderLink()}

                <Text type='body1'>Status</Text>
                <Text type='body2'>{_.capitalize(report.status)}</Text>
                <br />

                <Text type='body1'>Report Type</Text>
                <Text type='body2'>{report.reportTypeName} ({report.official ? 'Official' : 'Unofficial'})</Text>
                <br />

                <Text type='body1'>Date Range</Text>
                <Text type='body2'>{moment(report.data.beginning_date).format('MM/DD/YYYY')} - {moment(report.data.ending_date).format('MM/DD/YYYY')}</Text>
                <br />

                <Text type='body1'>Generated At</Text>
                <Text type='body2'>{moment(report.createdAt).format('MM/DD/YYYY')}</Text>
                <br />
            </div>
        )
    }
}

Report.propTypes = {
    Report: PropTypes.object
};
