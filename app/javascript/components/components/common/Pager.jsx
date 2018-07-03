import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Text from '../common/Text';

export default class Pager extends React.Component {

    pageIndex() {
        let parsed = queryString.parse(location.search);

        return _.isEmpty(parsed.page) ? 0 : Number(parsed.page);
    }

    renderBack() {
        let display = this.pageIndex() == 0 ? 'hidden' : 'visible';

        return (
            <Link className='link pager-item' to={`${this.props.baseLink}?page=${this.pageIndex() - 1}`} style={{ visibility: display }}>
                Back
            </Link>
        )
    }

    renderNext() {
        let display = this.pageIndex() >= _.ceil(this.props.elements.length / this.props.elementsPerPage) - 1 ? 'hidden' : 'visible';

        return (
            <Link className='link pager-item' to={`${this.props.baseLink}?page=${this.pageIndex() + 1}`} style={{ visibility: display }}>
                Next
            </Link>
        )
    }

    renderPages() {
        return (
            <div>
                {this.renderBack()}

                {_.range(0, _.ceil(this.props.elements.length / this.props.elementsPerPage)).map((index) => {
                    if (this.pageIndex() == index) {
                        return (
                            <span className='pager-item' key={index}>
                                {index + 1}
                            </span>
                        );
                    } else {
                        return (
                            <Link className='link pager-item' to={`${this.props.baseLink}?page=${index}`} key={index}>
                                {index + 1}
                            </Link>
                        );
                    }
                })}

                {this.renderNext()}
            </div>
        );
    }

    render() {
        let { elements, elementsPerPage, baseLink, className, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`pager ${className}`} {...props}>
                <Text type='body1'>
                    {this.renderPages()}
                </Text>
            </div>
        );
    }
}

Pager.propTypes = {
    elements: PropTypes.array,
    elementsPerPage: PropTypes.number,
    baseLink: PropTypes.string,
    className: PropTypes.string
};
