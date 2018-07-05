import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'candidatexyz-common-js/lib/elements';

class CompanyTitle extends React.Component {

    render() {
        let { type, className, invert, ...props } = this.props;

        return (
            <Text className={`${invert ? 'xyz-outer--inverted' : ''} ${className}`} type={type} {...props}>
                <span>
                    candidate<span className={`${invert? 'xyz--inverted' : 'xyz'}`}>XYZ</span>
                </span>
            </Text>
        );
    }
}

CompanyTitle.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    invert: PropTypes.bool
};

export default CompanyTitle;
