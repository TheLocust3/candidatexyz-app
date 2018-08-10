import React from 'react';
import { connect } from 'react-redux';
import { DonorActions } from 'candidatexyz-common-js';
import { Text, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import DonationForm from '../../../components/finance/donations/DonationForm';
import InKindForm from '../../../components/finance/in-kinds/InKindForm';

const DONATION_TYPES = ['Monetary', 'In Kind'];

class CreateDonation extends React.Component {

    constructor(props) {
        super(props);

        this.state = { type: 'Monetary' };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Create Donation'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(DonorActions.fetchAllDonors());
    }
    
    handleTypeChange(select) {
        this.setState({
            type: select.value
        });
    }

    renderTypeDropdown() {
        return (
            <Select label='Donation Type' onChange={(select) => this.handleTypeChange(select)} selectedIndex={_.find(DONATION_TYPES, this.state.type)} style={{ width: '30%' }}>
                {DONATION_TYPES.map((type) => {
                    return (
                        <SelectItem key={type}>
                            {type}
                        </SelectItem>
                    );
                })}
            </Select>
        );
    }

    renderForm() {
        if (this.state.type == 'Monetary') {
            return (
                <div>
                    {/* Generate donors (below) so autocomplete completes the fullest one possible (with email and stuff) */}
                    <DonationForm receipts={this.props.donors.donors} receiptType='donation' />
                </div>
            );
        } else {
            return (
                <div>
                    <InKindForm inKinds={this.props.donors.donors} />
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Donation</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        {this.renderTypeDropdown()}

                        {this.renderForm()}
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/donations/' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.donors.isReady,
        donors: state.donors.donors
    };
}

export default connect(mapStateToProps)(CreateDonation);
