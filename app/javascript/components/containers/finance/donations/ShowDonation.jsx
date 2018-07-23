import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReceiptActions, ReceiptApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Donation from '../../../components/finance/donations/Donation';

class ShowDonation extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Donation'));
        this.props.dispatch(setBreadcrumb('Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(ReceiptActions.fetchReceipt(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ReceiptApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/donations');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>
                    {this.props.receipt.name}

                    <span className='resource-actions relative'>
                        <Link className='resource-actions-item unstyled-link-black' to={`/finance/donations/${this.props.match.params.id}/edit`}>
                            <i className='material-icons middle'>edit</i>
                        </Link>

                        <a className='resource-actions-item unstyled-link-black delete' href='#' onClick={this.onDeleteClick.bind(this)}>
                            <i className='material-icons middle'>delete</i>
                        </a>
                    </span>
                </Text>

                <div className='resource-actions-under'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/finance/donors/${this.props.receipt.name}`}>
                        <Text type='body2'>Show Donor</Text>
                    </Link>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Donation receipt={this.props.receipt} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/donations' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.receipts.isReady,
        receipt: state.receipts.receipt
    };
}

export default connect(mapStateToProps)(ShowDonation);
