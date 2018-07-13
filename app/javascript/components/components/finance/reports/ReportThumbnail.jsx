import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class ReportThumbnail extends React.Component {

    renderThumbnail() {
        let report = this.props.report;

        let denseClassName = this.props.dense ? 'resource-list-item--dense' : '';
        let titleType = this.props.dense ? 'body2' : 'body1';
        let subtitleType = this.props.dense ? 'caption' : 'body2';

        return (
            <Link className='unstyled-link-black link-no-hover' to={`/finance/reports/${report.id}`}>
                <li className={`mdc-list-item resource-list-item ${denseClassName}`}>
                    <span className='mdc-list-item__text'>
                        <Text type={titleType}>
                            {report.id}
                        </Text>

                        <span className='mdc-list-item__secondary-text'>
                            <Text type={subtitleType}>
                                Report Type: {report.reportTypeName}<br />
                            </Text>
                        </span>
                    </span>
                </li>
            </Link>
        );
    }

    render() {
        if (_.isEmpty(this.props.report)) {
            return (
                <Text type='body2'>
                    None
                </Text>
            )
        } else {
            return this.renderThumbnail();
        }
    }
}

ReportThumbnail.propTypes = {
    report: PropTypes.object,
    dense: PropTypes.bool
};
