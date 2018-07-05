import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

class NotFound extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('404'));
        this.props.dispatch(setBreadcrumb('Not Found'));
        this.props.dispatch(setDrawerSelected(''));
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
