import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Text from '../components/common/Text';

class Website extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Website'));
        this.props.dispatch(setBreadcrumb('Website'));
        this.props.dispatch(setDrawerSelected('website'))
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
