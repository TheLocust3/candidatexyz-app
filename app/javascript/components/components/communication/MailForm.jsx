import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MailApi } from 'candidatexyz-common-js';
import { Text, Button, Form, TextField, TextEditor } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

export default class MailForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { mail: { subject: _.isEmpty(this.props.subject) ? '' : this.props.subject, body: '' }, errors: {} };
    }
    
    handleChange(event) {
        let mail = this.state.mail;
        mail[event.target.name] = event.target.value;

        this.setState({
            mail: mail
        });
    }

    handleEditorChange(content) {
        let mail = this.state.mail;
        mail.body = content;

        this.setState({
            mail: mail
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.emails.map((email) => {
            let subject = this.state.mail.subject.replace(/\[FIRST_NAME\]/g, email.firstName).replace(/\[LAST_NAME\]/g, email.lastName);
            let body = this.state.mail.body.replace(/\[FIRST_NAME\]/g, email.firstName).replace(/\[LAST_NAME\]/g, email.lastName);

            if (email.type == 'message') {
                MailApi.respondToMessage(email.email, subject, body);
            } else {
                MailApi.sendEmail(email.email, subject, body, email.type, email.id);
            }
        });

        history.push('/');
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Subject' name='subject' defaultValue={this.state.mail.subject} onChange={this.handleChange.bind(this)} /><br /><br />
                
                <TextEditor onChange={(content) => this.handleEditorChange(content)} />
                <br />
                
                <Button type='submit' className='right-form-button'>Send</Button>
                <br /><br /><br />

                <div className='content-2'>
                    <Text type='body2'>Type in [FIRST_NAME] or [LAST_NAME] for it to be replaced with the appropriate information</Text>
                </div>
            </Form>
        );
    }
}

MailForm.propTypes = {
    subject: PropTypes.string,
    emails: PropTypes.array.isRequired,
};
