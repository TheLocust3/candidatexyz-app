import React from 'react';
import { connect } from 'react-redux';
import { MessageActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import Text from '../../components/common/Text';
import BackLink from '../../components/common/BackLink';
import Message from '../../components/communication/Message';

class ShowMessage extends React.Component {

    componentWillMount() {
        this.props.dispatch(setTitle('View Message'));
        this.props.dispatch(setBreadcrumb('Message'));
        this.props.dispatch(setDrawerSelected('communication', 'messages'));

        this.props.dispatch(MessageActions.fetchMessage(this.props.match.params.id));
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>View Message</Text>
                <br /><br />

                <div className='content-2'>
                    <Message message={this.props.message} />
                </div>
                <br />

                <BackLink to='/communication/messages' />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        message: state.messages.message
    };
}

export default connect(mapStateToProps)(ShowMessage);
