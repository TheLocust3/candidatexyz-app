import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

import Text from '../components/common/Text';

class Website extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Website'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Website Overview</Text>
            </div>
        );
    }
}

export default connect()(Website);
