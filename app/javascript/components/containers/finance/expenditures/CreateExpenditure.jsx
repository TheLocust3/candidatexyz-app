import React from 'react';
import { connect } from 'react-redux';
import { ExpenditureActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import ExpenditureForm from '../../../components/finance/expenditures/ExpenditureForm';

class CreateExpenditure extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Add Expense'));
        this.props.dispatch(setBreadcrumb('Expenses'));
        this.props.dispatch(setDrawerSelected('finance', 'expenditures'));

        this.props.dispatch(ExpenditureActions.fetchAllExpenditures());
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Expense</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <ExpenditureForm expenditures={this.props.expenditures.expenditures} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/expenditures/' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.expenditures.isReady,
        expenditures: state.expenditures.expenditures
    };
}

export default connect(mapStateToProps)(CreateExpenditure);
