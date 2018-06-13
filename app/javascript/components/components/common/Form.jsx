import _ from 'lodash'
import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleSubmit(event);
    }

    renderErrors() {
        if (_.isEmpty(this.props.errors)) return;

        return (
            <i>
                {_.map(this.props.errors, (errorMessage, errorName) => {
                    return (
                        <div key={errorName}>
                            {_.capitalize(errorName)} {_.lowerCase(_.join(errorMessage, ', '))}
                        </div>
                    )
                })}
            </i>
        )
    }

    render() {
        let { handleSubmit, errors, children, ...props } = this.props;

        return (
            <form onSubmit={this.handleSubmit.bind(this)} {...props}>
                {children}
                <br /><br />

                {this.renderErrors()}
            </form>
        );
    }
}

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};
