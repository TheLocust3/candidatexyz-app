import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class Messages extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Messages'));
        this.props.dispatch(setBreadcrumb('Messages'));
        this.props.dispatch(setDrawerSelected('communication', 'messages'))
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Messages Overview</Text>
            </div>
        );
    }
}

export default connect()(Messages);
