import React from 'react';
import PropTypes from 'prop-types';

import Text from '../common/Text';

export default class Website extends React.Component {

    render() {
        return (
            <div className='content'>
                <Text type='body2'>Total site views: {this.props.analyticEntries.length}</Text>
            </div>
        );
    }
}

Website.propTypes = {
    analyticEntries: PropTypes.array
};
