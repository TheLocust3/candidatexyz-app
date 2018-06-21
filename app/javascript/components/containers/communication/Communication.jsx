import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class Communication extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Communication'));
        this.props.dispatch(setBreadcrumb('Communication'));
        this.props.dispatch(setDrawerSelected('communication'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Communication Overview</Text>
            </div>
        );
    }
}

export default connect()(Communication);
