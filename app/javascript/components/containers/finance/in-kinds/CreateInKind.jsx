import React from 'react';
import { connect } from 'react-redux';
import { InKindActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import BackLink from '../../../components/common/BackLink';
import Loader from '../../../components/common/Loader';
import InKindForm from '../../../components/finance/in-kinds/InKindForm';

class CreateInKind extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Add In Kind Contribution'));
        this.props.dispatch(setBreadcrumb('In Kind Contributions'));
        this.props.dispatch(setDrawerSelected('finance', 'inKinds'));

        this.props.dispatch(InKindActions.fetchAllInKinds());
    }
    
    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Add In Kind Contribution</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <InKindForm inKinds={this.props.inKinds.inKinds} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/finance/in-kinds/' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.inKinds.isReady,
        inKinds: state.inKinds.inKinds
    };
}

export default connect(mapStateToProps)(CreateInKind);
