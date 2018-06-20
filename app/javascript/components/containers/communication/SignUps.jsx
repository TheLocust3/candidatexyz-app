import React from 'react';
import { connect } from 'react-redux';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';

class SignUps extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Sign Ups'));
        this.props.dispatch(setBreadcrumb('Sign Ups'));
        this.props.dispatch(setDrawerSelected('communication', 'signUps'))
    }

    render() {
        return (
            <div className='content'>
                <Text type='body1'>Sign Ups Overview</Text>
            </div>
        );
    }
}

export default connect()(SignUps);
