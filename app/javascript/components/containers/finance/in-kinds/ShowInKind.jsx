import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { InKindActions, InKindApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import InKind from '../../../components/finance/in-kinds/InKind';

class ShowInKind extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View In Kind Donation'));
        this.props.dispatch(setBreadcrumb('In Kind Donations'));
        this.props.dispatch(setDrawerSelected('finance', 'donations'));

        this.props.dispatch(InKindActions.fetchInKind(this.props.match.params.id));
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
                <Text type='headline5'>
                    {this.props.inKind.fromWhom} (In Kind)

                    <span className='resource-actions relative'>
                        <Link className='resource-actions-item unstyled-link-black' to={`/finance/in-kinds/${this.props.match.params.id}/edit`}>
                            <i className='material-icons middle'>edit</i>
                        </Link>

                        <a className='resource-actions-item unstyled-link-black delete' href='#' onClick={this.onDeleteClick.bind(this)}>
                            <i className='material-icons middle'>delete</i>
                        </a>
                    </span>
                </Text>

                <div className='resource-actions-under'>
                    <Link className='resource-actions-item unstyled-link-black' to={`/finance/donors/${this.props.inKind.fromWhom}`}>
                        <Text type='body2'>Show Donor</Text>
                    </Link>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <InKind inKind={this.props.inKind} />
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
        isReady: state.inKinds.isReady,
        inKind: state.inKinds.inKind
    };
}

export default connect(mapStateToProps)(ShowInKind);
