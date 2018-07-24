import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class Pager extends React.Component {

    pageIndex() {
        let parsed = queryString.parse(location.search);

        return _.isEmpty(parsed.page) ? 0 : Number(parsed.page);
    }

    renderBack() {
        if (this.pageIndex() == 0) {
            return (
                <span className='pager-item'>
                    Back
                </span>
            );
        }

        return (
            <Link className='link pager-item' to={`${this.props.baseLink}?page=${this.pageIndex() - 1}`}>
                Back
            </Link>
        )
    }

    renderNext() {
        if (this.pageIndex() >= this.length() - 1) {
            return (
                <span className='pager-item'>
                    Next
                </span>
            );
        }

        return (
            <Link className='link pager-item' to={`${this.props.baseLink}?page=${this.pageIndex() + 1}`}>
                Next
            </Link>
        )
    }

    renderPages() {
        if (this.length() == 1 && this.props.hideEmpty) return;

        return (
            <div>
                {this.renderBack()}

                {_.range(0, this.length()).map((index) => {
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
        let { elements, elementsPerPage, baseLink, hideEmpty, className, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`pager ${className}`} {...props}>
                <Text type='body1'>
                    {this.renderPages()}
                </Text>
            </div>
        );
    }

    private
    length() {
        return _.ceil(this.props.elements.length / this.props.elementsPerPage);
    }
}

Pager.propTypes = {
    elements: PropTypes.array,
    elementsPerPage: PropTypes.number,
    baseLink: PropTypes.string,
    className: PropTypes.string,
    hideEmpty: PropTypes.bool
};
