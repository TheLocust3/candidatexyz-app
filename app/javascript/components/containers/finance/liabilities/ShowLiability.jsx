import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LiabilityActions, LiabilityApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Liability from '../../../components/finance/liabilities/Liability';

class ShowLiability extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Liability'));
        this.props.dispatch(setBreadcrumb('Debts'));
        this.props.dispatch(setDrawerSelected('finance', 'liabilities'));

        this.props.dispatch(LiabilityActions.fetchLiability(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        LiabilityApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/liabilities');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>{this.props.liability.toWhom}</Text>

                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/finance/liabilities/${this.props.match.params.id}/edit`}>
                        <Text type='body2'>Edit</Text>
                    </Link>

                    <div className='resource-actions-spacer' />

                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Liability liability={this.props.liability} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/liabilities' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.liabilities.isReady,
        liability: state.liabilities.liability
    };
}

export default connect(mapStateToProps)(ShowLiability);
