import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Report extends React.Component {

    render() {
        let report = this.props.report;

        return (
            <div>
                <Text type='body1'><a className='link' href={report.url}>View Report</a></Text>
                <br />

                <Text type='body1'>Status</Text>
                <Text type='body2'>{_.capitalize(report.status)}</Text>
                <br />

                <Text type='body1'>Report Type</Text>
                <Text type='body2'>{report.reportTypeName}</Text>
                <br />

                <Text type='body1'>Official Report?</Text>
                <Text type='body2'>{report.official ? 'Yes' : 'No'}</Text>
                <br />

                <Text type='body1'>Beginning Date</Text>
                <Text type='body2'>{moment(report.data.beginning_date).format('MM/DD/YYYY')}</Text>
                <br />

                <Text type='body1'>Ending Date</Text>
                <Text type='body2'>{moment(report.data.ending_date).format('MM/DD/YYYY')}</Text>
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
