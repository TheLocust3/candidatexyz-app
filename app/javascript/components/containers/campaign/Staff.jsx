import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class Staff extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Staff'));
        this.props.dispatch(setDrawerSelected('campaign', 'staff'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Staff Overview</Text>
            </div>
        );
    }
}

export default connect()(Staff);
