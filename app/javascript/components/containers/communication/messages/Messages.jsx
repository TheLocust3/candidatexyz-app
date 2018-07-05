import React from 'react';
import { connect } from 'react-redux';
import { MessageActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import MessageList from '../../../components/communication/messages/MessageList';

class Messages extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('Messages'));
        this.props.dispatch(setBreadcrumb('Messages'));
        this.props.dispatch(setDrawerSelected('communication', 'messages'));

        this.props.dispatch(MessageActions.fetchAllMessages());
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Message List</Text>
                <br />

                <Loader isReady={this.props.isReady}>
                    <MessageList messages={this.props.messages.messages} />
                </Loader>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isReady: state.messages.isReady,
        messages: state.messages.messages
    };
}

export default connect(mapStateToProps)(Messages);
