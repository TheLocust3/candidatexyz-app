import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextField } from '@material/textfield';

import { uuid } from '../../../helpers';

import Text from './Text';

export default class TextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = { defaultValue: props.defaultValue, uuid: `textfield-${uuid()}` };
    }

    componentDidMount() {
        if (_.isEmpty(this.props.defaultValue)) return;

        let textField = new MDCTextField(document.querySelector(`#${this.state.uuid}`));
        textField.value = this.state.defaultValue;
    }

    componentDidUpdate() {
        if (_.isEmpty(this.props.defaultValue)) return;

        if (this.state.defaultValue != this.props.defaultValue) {
            let textField = new MDCTextField(document.querySelector(`#${this.state.uuid}`));
            textField.value = this.props.defaultValue;

            this.setState({
                defaultValue: this.props.defaultValue
            });
        }
    }

    render() {
        let { className, style, label, defaultValue, onChange, required, value, type, size, dense, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;
        let denseClassName = dense ? 'mdc-text-field--dense' : '';

        type = _.isEmpty(type) ? 'text' : type;

        return (
            <div id={this.state.uuid} className={`mdc-text-field ${denseClassName} ${className}`} data-mdc-auto-init='MDCTextField' style={style}>
                <input type={type} className='mdc-text-field__input mdc-typography--body2' onChange={onChange} value={value} size={size} required={required} {...props} />
                <label className='mdc-floating-label'><Text type='body2'>{label}</Text></label>

                <div className='mdc-line-ripple' />
            </div>
        );
    }
}

TextField.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.number,
    dense: PropTypes.bool
};
