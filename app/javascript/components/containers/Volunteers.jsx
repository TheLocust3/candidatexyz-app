import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

import Text from '../components/common/Text';

class Volunteers extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Volunteers'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Volunteers Overview</Text>
            </div>
        );
    }
}

export default connect()(Volunteers);
