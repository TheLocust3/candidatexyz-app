import React from 'react';
import PropTypes from 'prop-types';

class SelectItem extends React.Component {

    render() {
        let { children, ...props } = this.props;

        return (
            <option value={children} {...props}>
                {children}
            </option>
        );
    }
}

SelectItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};

export default SelectItem;
