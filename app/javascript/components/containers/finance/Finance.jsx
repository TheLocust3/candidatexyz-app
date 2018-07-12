import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CampaignActions, AnalyticEntryActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Loader from '../../components/common/Loader';

class Finance extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Finance'));
        this.props.dispatch(setBreadcrumb('Finance'));
        this.props.dispatch(setDrawerSelected('finance'));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Finance Overview</Text>
                <br />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps)(Finance);
