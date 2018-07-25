import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StaffActions } from 'candidatexyz-common-js';
import { Text, Button } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerDisabled } from '../../actions/global-actions';

class Setup extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Setup Campaign'));
        this.props.dispatch(setBreadcrumb('Setup'));
        this.props.dispatch(setDrawerDisabled(true));

        this.props.dispatch(StaffActions.fetchStaffPositions());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Setup Your Campaign</Text>
                <br />

                <center>
                    <Link className='unstyled-link-black' to='/user'>
                        <Button>Get Started</Button>
                    </Link>
                </center>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.users.isReady,
        positions: state.users.positions,
        isCurrentUserReady: state.users.isCurrentUserReady,
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(Setup);
