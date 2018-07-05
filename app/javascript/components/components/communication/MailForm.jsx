import React from 'react';
import PropTypes from 'prop-types';
import { MailApi } from 'candidatexyz-common-js';
import { Button, Form, TextField, TextEditor } from 'candidatexyz-common-js/lib/elements';

export default class MailForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = { mail: {}, errors: {} };
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

        this.props.sendMail(this.state.mail);
    }

    render() {
        return (
            <Form handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors}>
                <TextField label='Subject' name='subject' onChange={this.handleChange.bind(this)} style={{ width: '100%' }} /><br /><br />
                
                <TextEditor onChange={(content) => this.handleEditorChange(content)} />
                <br />
                
                <Button type='submit' className='right-form-button'>Send</Button>
            </Form>
        );
    }
}

MailForm.propTypes = {
    sendMail: PropTypes.func.isRequired
};
