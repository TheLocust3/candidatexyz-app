import React from 'react';
import { connect } from 'react-redux';

import { setTitle } from '../actions/global-actions';

class Index extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
    }

    render() {
        return (
            <div className='content'>
                Hello World!
            </div>
        );
    }
}

export default connect()(Index);
