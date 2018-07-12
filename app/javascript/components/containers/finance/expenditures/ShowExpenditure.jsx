import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ExpenditureActions, ExpenditureApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Expenditure from '../../../components/finance/expenditures/Expenditure';

class ShowExpenditure extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Expense'));
        this.props.dispatch(setBreadcrumb('Expense'));
        this.props.dispatch(setDrawerSelected('finance', 'expenditures'));

        this.props.dispatch(ExpenditureActions.fetchExpenditure(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        ExpenditureApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/expenditures');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Expense</Text>

                <div className='resource-actions'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/finance/expenditures/${this.props.match.params.id}/edit`}>
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
                        <Expenditure expenditure={this.props.expenditure} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/expenditures' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.expenditures.isReady,
        expenditure: state.expenditures.expenditure
    };
}

export default connect(mapStateToProps)(ShowExpenditure);
