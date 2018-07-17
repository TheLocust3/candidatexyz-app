import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class DatePicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = { date: this.props.defaultValue };
    }

    handleDateChange(date) {
        this.setState({
            date: date
        });

        this.props.onChange(date);
    }

    render() {
        let { defaultValue, label, ...props } = this.props;

        return (
            <Text type='body2' {...props}>
                {label}

                <DayPickerInput inputProps={{ className: 'mdc-typography--body2' }} classNames={{ container: 'DayPickerInput mdc-typography--body2', overlayWrapper: 'DayPickerInput-OverlayWrapper mdc-typography--body2', overlay: 'DayPickerInput-Overlay mdc-typography--body2' }}
                    formatDate={formatDate} parseDate={parseDate} value={`${formatDate(this.state.date)}`} onDayChange={(date) => this.handleDateChange(date)} /><br />
            </Text>
        );
    }
}

DatePicker.propTypes = {
    defaultValue: PropTypes.any,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
