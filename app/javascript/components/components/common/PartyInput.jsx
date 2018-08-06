import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, SelectItem, MDCAutoInit } from 'candidatexyz-common-js/lib/elements';

import { PARTIES } from '../../../constants';

export default class PartyInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = { party: _.isEmpty(this.props.party) ? PARTIES[0] : this.props.party };
    }
    
    handleChange(event) {
        this.setState({
            party: event.target.value
        });

        this.props.onChange('party', event.target.value);
    }

    handlePartyChange(select) {
        this.setState({
            party: select.value
        });

        this.props.onChange('party', select.value);
    }

    renderPartyDropdown() {
        let selectedIndex = _.findIndex(PARTIES, (party) => { return party == this.state.party });
        if (selectedIndex == -1) {
            selectedIndex = _.findIndex(PARTIES, (party) => { return party == 'Other' });
        }

        return (
            <Select label='Party' onChange={(select) => this.handlePartyChange(select)} selectedIndex={selectedIndex} style={{ width: '30%', marginRight: '5%' }} required={this.props.required}>
                {PARTIES.map((party) => {
                    return (
                        <SelectItem key={party}>
                            {party}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    renderOtherTextField() {
        let show = this.state.party == 'Other' || !_.includes(PARTIES, this.state.party) ? 'visible' : 'hidden';

        return <TextField label='Party' name='party' onChange={this.handleChange.bind(this)} defaultValue={this.state.party} style={{ width: '65%', visibility: show }} required={this.props.required} />;
    }

    render() {
        return (
            <div>
                {this.renderPartyDropdown()}
                {this.renderOtherTextField()}
                

                <MDCAutoInit />
            </div>
        );
    }
}

PartyInput.propTypes = {
    party: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};
