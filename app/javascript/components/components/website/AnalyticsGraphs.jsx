import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import AggregateGraph from './AggregateGraph';

const GRAPHS = ['Past 24 Hours', 'Past 31 Days', 'All Time'];

export default class AnalyticGraphs extends React.Component {

    constructor(props) {
        super(props);

        this.state = { graph: GRAPHS[0] };
    }

    handleGraphChange(select) {
        this.setState({
            graph: select.value
        });
    }

    renderDropdown() {
        return (
            <Select label='Graph Type' onChange={(select) => this.handleGraphChange(select)} selectedIndex={_.findIndex(GRAPHS, (graph) => { return graph == this.state.graph })} style={{ width: '40%' }}>
                {GRAPHS.map((graph) => {
                    return (
                        <SelectItem key={graph}>
                            {graph}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    renderGraph() {
        if (this.state.graph == 'Past 24 Hours') {
            let dayStart = moment().minute(0).second(0).millisecond(0).subtract(24, 'hours');
            let dayEnd = moment().minute(0).second(0).millisecond(0);

            return (
                <div>
                    <Text type='body2'>Page views per hour</Text><br />

                    <AggregateGraph analyticEntries={this.props.analyticEntries.hour} start={dayStart} end={dayEnd} unit='hour' />
                </div>
            );
        } else if (this.state.graph == 'Past 31 Days') {
            let monthStart = moment().hour(0).minute(0).second(0).millisecond(0).subtract(31, 'days');
            let monthEnd = moment().hour(0).minute(0).second(0).millisecond(0);

            return (
                <div>
                    <Text type='body2'>Page views per day</Text><br />

                    <AggregateGraph analyticEntries={this.props.analyticEntries.day} start={monthStart} end={monthEnd} unit='day' />
                </div>
            );
        } else if (this.state.graph == 'All Time') {
            let yearEnd = moment().add(1, 'year').month(0).day(0).hour(0).minute(0).second(0).millisecond(0);
            let earliestYear = moment(_.minBy(this.props.analyticEntries.month, (entry) => { return entry.datetime })).month(0).day(0).hour(0).minute(0).second(0).millisecond(0);

            return (
                <div>
                    <Text type='body2'>Page views per month</Text><br />
                    <AggregateGraph analyticEntries={this.props.analyticEntries.month} start={earliestYear} end={yearEnd} unit='month' />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderDropdown()}
                <br /><br />

                <Text type='headline6'>{this.state.graph}</Text>
                {this.renderGraph()}
            </div>
        );
    }
}

AnalyticGraphs.propTypes = {
    analyticEntries: PropTypes.object
};
