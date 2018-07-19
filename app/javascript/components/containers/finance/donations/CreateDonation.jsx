import React from 'react';
import { connect } from 'react-redux';
import { ReceiptActions, InKindActions, DonorHelper } from 'candidatexyz-common-js';
import { Text, Select, SelectItem } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import DonationForm from '../../../components/finance/donations/DonationForm';
import InKindForm from '../../../components/finance/in-kinds/InKindForm';

const DONATION_TYPES = ['Receipt', 'In Kind'];

class CreateDonation extends React.Component {

    constructor(props) {
        super(props);

        this.state = { type: 'Receipt' };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Create Donation'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchAllReceipts());
        this.props.dispatch(InKindActions.fetchAllInKinds());
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
        let donations = DonorHelper.mergeDonations(this.props.receipts.receipts, this.props.inKinds.inKinds);

        if (this.state.type == 'Receipt') {
            return (
                <div>
                    {/* Generate donors (below) so autocomplete completes the fullest one possible (with email and stuff) */}
                    <DonationForm receipts={DonorHelper.generateDonors(donations)} receiptType='donation' />
                </div>
            );
        } else {
            return (
                <div>
                    <InKindForm inKinds={DonorHelper.generateDonors(donations)} />
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
                    <Loader isReady={this.props.areDonationsReady && this.props.areInKindsReady}>
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
        areDonationsReady: state.receipts.isReady,
        receipts: state.receipts.receipts,
        areInKindsReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(CreateDonation);
