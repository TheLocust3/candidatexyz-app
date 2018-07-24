import React from 'react';
import { connect } from 'react-redux';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected, setDrawerDisabled } from '../actions/global-actions';


class Setup extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Home'));
        this.props.dispatch(setBreadcrumb('Home'));
        this.props.dispatch(setDrawerDisabled(true))
    }

    componentWillUnmount() {
        this.props.dispatch(setDrawerDisabled(false))
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Setup</Text>
                <br />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

export default connect(mapStateToProps)(Setup);
