import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import Pager from '../../common/Pager';
import ReportThumbnail from './ReportThumbnail';

const PER_PAGE = 10;

export default class ReportList extends React.Component {

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line'>
                {_.slice(this.props.reports, page * PER_PAGE, (page + 1) * PER_PAGE).map((report, index) => {
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
        if (_.isEmpty(this.props.reports)) {
            return this.renderNone();
        } else {
            return (
                <div>
                    {this.renderList()}
                    <br />

                    <Pager elements={this.props.reports} elementsPerPage={PER_PAGE} baseLink='/finance/reports' />
                </div>
            );
        }
    }
}

ReportList.propTypes = {
    reports: PropTypes.array
};
