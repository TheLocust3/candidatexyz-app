import React from 'react';
import { connect } from 'react-redux';
import { MessageApi, MessageActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../../constants';
import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import Message from '../../../components/communication/messages/Message';

class ShowMessage extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Message'));
        this.props.dispatch(setBreadcrumb('Message'));
        this.props.dispatch(setDrawerSelected('communication', 'messages'));

        this.props.dispatch(MessageActions.fetchMessage(this.props.match.params.id));
    }

    onDeleteClick(event) {
        let shouldDelete = confirm('Are you sure?');
        if (!shouldDelete) return;

        MessageApi.destroy(this.props.match.params.id).then(() => {
            history.push('/communication/messages');
        });
    }


    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Message</Text>

                <div className='resource-actions'>
                    <a className='resource-actions-item unstyled-link-black' href='#' onClick={this.onDeleteClick.bind(this)}>
                        <Text type='body2'>Delete</Text>
                    </a>
                </div>
                <br /><br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady}>
                        <Message message={this.props.message} />
                    </Loader>
                </div>
                <br />

                <BackLink to='/communication/messages' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.messages.isReady,
        message: state.messages.message
    };
}

export default connect(mapStateToProps)(ShowMessage);
