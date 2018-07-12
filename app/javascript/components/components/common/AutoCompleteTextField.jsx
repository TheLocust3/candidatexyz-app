import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Text, TextField } from 'candidatexyz-common-js/lib/elements';

import { arraysEquals } from '../../../helpers';

const MAX_SHOWN = 5;

export default class AutoCompleteTextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = { suggested: [], value: _.isEmpty(this.props.defaultValue) ? '' : this.props.defaultValue };
    }

    componentDidMount() {
        $(document).click((event) => {
            if (!this.state.closed && !$(event.target).parents().is('.autocomplete-wrapper')) {
                this.setState({
                    suggested: []
                });
            }
        });
    }

    componentDidUpdate() {
        if (this.state.closed) return;
        
        if (_.isEmpty(this.state.value)) {
            if (this.state.suggested.length != 0) {
                this.setState({
                    suggested: []
                });
            }

            return;
        }

        let suggested = _.filter(this.props.elements, (element) => { return _.startsWith(_.lowerCase(element[this.props.elementKey]), _.lowerCase(this.state.value)) });
        suggested = _.sortBy(suggested, (element) => { return element[this.props.elementKey] });
        suggested = _.uniqBy(suggested, (element) => { return element[this.props.elementKey] });

        if (!_.isEmpty(suggested) && suggested[0][this.props.elementKey] == this.state.value) {
            if (this.state.suggested.length != 0) {
                this.props.onAutoComplete(suggested[0]);

                this.setState({
                    suggested: []
                });
            }

            return;
        }

        if (!arraysEquals(suggested, this.state.suggested)) {
            this.setState({
                suggested: suggested
            });
        }
    }

    componentWillUnmount() {
        $(document).off('click');
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });

        this.props.onChange(event);
    }

    onItemClick(element) {
        this.setState({
            value: element[this.props.elementKey]
        });

        this.props.onAutoComplete(element);
    }

    renderAutoComplete() {
        if (_.isEmpty(this.state.suggested)) return;

        return (
            <div className='autocomplete'>
                {_.map(_.slice(this.state.suggested, 0, MAX_SHOWN), (element) => {
                    return (
                        <div key={element[this.props.elementKey]} className='autocomplete-item' onClick={() => this.onItemClick(element)}>
                            <Text type='body2'>
                                {element[this.props.elementKey]}
                            </Text>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        let { elements, elementKey, onChange, onAutoComplete, ...props } = this.props;

        return (
            <div className='autocomplete-wrapper'>
                <TextField label='Name' value={this.state.value} onChange={this.handleChange.bind(this)} {...props} />

                {this.renderAutoComplete()}
            </div>
        );
    }
}

AutoCompleteTextField.propTypes = {
    elements: PropTypes.array.isRequired,
    elementKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onAutoComplete: PropTypes.func.isRequired
};
