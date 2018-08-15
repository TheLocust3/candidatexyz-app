import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import Pager from '../../common/Pager';
import ReportThumbnail from './ReportThumbnail';

const PER_PAGE = 10;

export default class ReportList extends React.Component {

    constructor(props) {
        super(props);

        this.state = { reports: _.filter(this.props.reports, (report) => { return report.reportClass == 'finance' }) };
    }

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line content-max'>
                {_.slice(_.reverse(_.sortBy(this.state.reports, (report) => { return report.createdAt })), page * PER_PAGE, (page + 1) * PER_PAGE).map((report, index) => {
                    return (
                        <div key={index}>
                            <ReportThumbnail report={report} />
                        </div>
                    );
                })}
            </ul>
        );
    }

    renderNone() {
        return <Text type='body1'>You currently have no reports!</Text>;
    }

    render() {
        if (_.isEmpty(this.state.reports)) {
            return this.renderNone();
        } else {
            return (
                <div>
                    {this.renderList()}
                    <br />

                    <Pager elements={this.state.reports} elementsPerPage={PER_PAGE} baseLink='/finance/reports' />
                </div>
            );
        }
    }
}

ReportList.propTypes = {
    reports: PropTypes.array
};
