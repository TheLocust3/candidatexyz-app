import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

export default class FullNameInput extends React.Component {

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }


    render() {
        return (
            <div>
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.firstName} required={this.props.required} style={{ width: '47.5%', marginRight: '5%' }} />
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.lastName} style={{ width: '47.5%' }} required={this.props.required} />

                <MDCAutoInit />
            </div>
        );
    }
}

FullNameInput.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};
