import React from 'react';
import { connect } from 'react-redux';
import { LiabilityActions, LiabilityApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import LiabilityForm from '../../../components/finance/liabilities/LiabilityForm';

class EditLiability extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit Liability'));
        this.props.dispatch(setBreadcrumb('Debts'));
        this.props.dispatch(setDrawerSelected('finance', 'liabilities'));

        this.props.dispatch(LiabilityActions.fetchLiability(this.props.match.params.id));
        this.props.dispatch(LiabilityActions.fetchAllLiabilities());
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
                <Text type='headline5'>Edit Debt</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <LiabilityForm liability={this.props.liability} liabilities={this.props.liabilities.liabilities} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/finance/liabilities/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.liabilities.isReady,
        liability: state.liabilities.liability,
        liabilities: state.liabilities.liabilities
    };
}

export default connect(mapStateToProps)(EditLiability);
