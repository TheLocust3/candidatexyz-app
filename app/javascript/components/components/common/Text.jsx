import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {

    render() {
        let { className, type, children, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`mdc-typography--${type} ${className}`} {...props}>
                {children}
            </div>
        );
    }
}

Text.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
};

export default Text;
