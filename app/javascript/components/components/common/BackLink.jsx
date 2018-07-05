import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class BackLink extends React.Component {

    render() {
        let { className, to, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div className='back-link'>
                <Link className={`unstyled-link-black ${className}`} to={to} {...props}>
                    <Text type='body2' className='back-link-text'>
                        &lt; Back
                    </Text>
                </Link>
            </div>
        );
    }
}

BackLink.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string
};
