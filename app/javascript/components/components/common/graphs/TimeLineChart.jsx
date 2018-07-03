import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

import { PURPLE_PRIMARY } from '../../../../constants';

export default class TimeLineChart extends React.Component {

    numberOfDigits(num) {
        return String(num).length;
    }

    render() {
        let yMax = _.maxBy(this.props.data, (datum) => { return datum.y }).y;

        let displayXAxisLabel = !_.isEmpty(this.props.xAxis);
        let displayYAxisLabel = !_.isEmpty(this.props.yAxis);

        let data = {
            datasets: [{
                label: this.props.label,
                backgroundColor: `rgba(${PURPLE_PRIMARY.red},${PURPLE_PRIMARY.green},${PURPLE_PRIMARY.blue},0.2)`,
                borderColor: `rgba(${PURPLE_PRIMARY.red},${PURPLE_PRIMARY.green},${PURPLE_PRIMARY.blue},1)`,
                data: this.props.data,
            }]
        };

        let options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    scaleLabel: {
                        display: displayXAxisLabel,
                        labelString: this.props.xAxis
                    },
                    time: {
                        unit: this.props.unit,
                        min: this.props.minX,
                        max: this.props.maxX
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: displayYAxisLabel,
                        labelString: this.props.yAxis
                    },
                    ticks: {
                        min: 0,
                        max: _.ceil(yMax * 1.25, -1 * (this.numberOfDigits(yMax) - 1))
                    }
                }]
            },
            legend: {
                display: false
            }
        };

        return <Line data={data} options={options} />;
    }
}

TimeLineChart.propTypes = {
    data: PropTypes.array.isRequired,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
    label: PropTypes.string,
    unit: PropTypes.string.isRequired,
    minX: PropTypes.any,
    maxX: PropTypes.any
};
