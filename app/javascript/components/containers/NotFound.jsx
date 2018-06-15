import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

import Text from '../components/common/Text';

class NotFound extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('404'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Page Not Found</Text><br />

                <Text type='body1'>You've found a page that doesn't exist!</Text>
            </div>
        );
    }
}

export default connect()(NotFound);
