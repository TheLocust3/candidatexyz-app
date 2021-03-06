import React from 'react';
import { connect } from 'react-redux';
import { MessageActions } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../../actions/global-actions';

import Loader from '../../../components/common/Loader';
import BackLink from '../../../components/common/BackLink';
import MessageEmail from '../../../components/communication/messages/MessageEmail';
import MailForm from '../../../components/communication/MailForm';

class RespondMessage extends React.Component {

    constructor(props) {
        super(props);

        this.state = { emails: [], shouldSend: false };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Respond to Message'));
        this.props.dispatch(setBreadcrumb('Messages'));
        this.props.dispatch(setDrawerSelected('communication', 'messages'));

        this.props.dispatch(MessageActions.fetchMessage(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isReady) return;

        let message = nextProps.message;
        this.setState({
            emails: [{ id: message.id, email: message.email, type: 'message', firstName: message.firstName, lastName: message.lastName }]
        });
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Respond to Message</Text>
                <br />

                <div className='content-2'>
                    <Loader isReady={this.props.isReady || this.state.shouldSend}>
                        <MessageEmail message={this.props.message} />
                        <br />

                        <MailForm subject={`RE: ${this.props.message.subject}`} emails={this.state.emails} />
                    </Loader>
                </div>
                <br />

                <BackLink to={`/communication/messages`} />
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

export default connect(mapStateToProps)(RespondMessage);
