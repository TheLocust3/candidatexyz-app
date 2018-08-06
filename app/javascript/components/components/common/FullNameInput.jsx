import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

export default class FullNameInput extends React.Component {

    handleChange(event) {
        this.props.onChange(event.target.name, event.target.value);
    }

    renderMiddleName() {
        if (!this.props.showMiddleName) return;

        return <TextField label='Middle Name' name='middleName' onChange={this.handleChange.bind(this)} defaultValue={this.props.middleName} style={{ width: '30%', marginRight: '5%' }} />;
    }

    render() {
        let width = this.props.showMiddleName ? '30%' : '47.5%';

        return (
            <div>
                <TextField label='First Name' name='firstName' onChange={this.handleChange.bind(this)} defaultValue={this.props.firstName} required={this.props.required} style={{ width: width, marginRight: '5%' }} />
                {this.renderMiddleName()}
                <TextField label='Last Name' name='lastName' onChange={this.handleChange.bind(this)} defaultValue={this.props.lastName} style={{ width: width }} required={this.props.required} />

                <MDCAutoInit />
            </div>
        );
    }
}

FullNameInput.propTypes = {
    firstName: PropTypes.string,
    middleName: PropTypes.string,
    lastName: PropTypes.string,
    showMiddleName: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};
