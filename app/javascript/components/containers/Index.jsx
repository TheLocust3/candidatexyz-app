import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

import Text from '../components/common/Text';

class Index extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Hello World!</Text>
            </div>
        );
    }
}

export default connect()(Index);
