import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Text from '../components/common/Text';

class Index extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
        this.props.dispatch(setBreadcrumb('Home'));
        this.props.dispatch(setDrawerSelected('home'))
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
