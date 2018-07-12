import React from 'react';
import { connect } from 'react-redux';
import { ExpenditureActions, ExpenditureApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import ExpenditureForm from '../../../components/finance/expenditures/ExpenditureForm';

class EditExpenditure extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Expense'));
        this.props.dispatch(setBreadcrumb('Expenses'));
        this.props.dispatch(setDrawerSelected('finance', 'expenditures'));

        this.props.dispatch(ExpenditureActions.fetchExpenditure(this.props.match.params.id));
        this.props.dispatch(ExpenditureActions.fetchAllExpenditures());
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
                <Text type='headline5'>Edit Expense</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <ExpenditureForm expenditure={this.props.expenditure} expenditures={this.props.expenditures.expenditures} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/finance/expenditures/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.expenditures.isReady,
        expenditure: state.expenditures.expenditure,
        expenditures: state.expenditures.expenditures
    };
}

export default connect(mapStateToProps)(EditExpenditure);
