import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class Campaign extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Campaign'));
        this.props.dispatch(setBreadcrumb('Campaign'));
        this.props.dispatch(setDrawerSelected('campaign'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Campaign Overview</Text>
            </div>
        );
    }
}

export default connect()(Campaign);
