import React from 'react';
import { connect } from 'react-redux';
import { AnalyticEntryActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../actions/global-actions';

import Text from '../components/common/Text';
import AnalyticsOverview from '../components/website/AnalyticsOverview';
import AnalyticsGraphs from '../components/website/AnalyticsGraphs';

class Website extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Website'));
        this.props.dispatch(setBreadcrumb('Website'));
        this.props.dispatch(setDrawerSelected('website'));

        this.props.dispatch(AnalyticEntryActions.fetchAllAnalyticEntries());
    }

    render() {
        if (!this.props.isReady) return null;

        return (
            <div className='content'>
                <Text type='headline5'>Website Analytics</Text>
                <br /><br />

                <div className='content-2'>
                    <Text type='headline6'>At a Glance</Text>
                    <AnalyticsOverview analyticEntries={this.props.analyticEntries.analyticEntries} />

                    <Text type='headline6'>Graphs</Text>
                    <AnalyticsGraphs analyticEntries={this.props.analyticEntries.analyticEntries} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.analyticEntries.isReady,
        analyticEntries: state.analyticEntries.analyticEntries
    };
}

export default connect(mapStateToProps)(Website);
