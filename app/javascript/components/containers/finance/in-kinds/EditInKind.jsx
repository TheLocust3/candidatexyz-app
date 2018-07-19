import React from 'react';
import { connect } from 'react-redux';
import { InKindActions, InKindApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import InKindForm from '../../../components/finance/in-kinds/InKindForm';

class EditInKind extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Edit In Kind Contribution'));
        this.props.dispatch(setBreadcrumb('In Kind Contributions'));
        this.props.dispatch(setDrawerSelected('finance', 'inKind'));

        this.props.dispatch(InKindActions.fetchInKind(this.props.match.params.id));
        this.props.dispatch(InKindActions.fetchAllInKinds());
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;
        
        InKindApi.destroy(this.props.match.params.id).then(() => {
            history.push('/finance/donations');
        });
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Edit In Kind Contribution</Text>
                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <InKindForm inKind={this.props.inKind} inKinds={this.props.inKinds.inKinds} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/finance/in-kinds/${this.props.match.params.id}`} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.inKinds.isReady,
        inKind: state.inKinds.inKind,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(EditInKind);
