import React from 'react';
import { connect } from 'react-redux';
import { LiabilityActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import LiabilityForm from '../../../components/finance/liabilities/LiabilityForm';

class CreateLiability extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Add Liability'));
        this.props.dispatch(setBreadcrumb('Debts'));
        this.props.dispatch(setDrawerSelected('finance', 'liabilities'));

        this.props.dispatch(LiabilityActions.fetchAllLiabilities());
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add Debt</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <LiabilityForm liabilities={this.props.liabilities.liabilities} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/liabilities/' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.liabilities.isReady,
        liabilities: state.liabilities.liabilities
    };
}

export default connect(mapStateToProps)(CreateLiability);
