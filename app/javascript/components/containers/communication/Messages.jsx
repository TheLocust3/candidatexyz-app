import React from 'react';
import { connect } from 'react-redux';
import { MessageActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import MessageList from '../../components/communication/MessageList';

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

                <MessageList messages={this.props.messages.messages} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages.messages
    };
}

export default connect(mapStateToProps)(Messages);
