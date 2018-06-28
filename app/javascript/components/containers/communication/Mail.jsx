import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { VolunteerActions, ContactActions, MessageActions } from 'candidatexyz-common-js';

import { setTitle, setBreadcrumb, setDrawerSelected } from '../../actions/global-actions';

import MDCAutoInit from '../../components/global/MDCAutoInit';
import Text from '../../components/common/Text';
import Select from '../../components/common/Select';
import SelectItem from '../../components/common/SelectItem';
import MailForm from '../../components/communication/MailForm';

const GROUPS = [{ key: 'signUps', value: 'All Sign Ups' }, { key: 'volunteers', value: 'All Volunteers' }];

class Mail extends React.Component {

    constructor(props) {
        super(props);

        this.state = { group: null };
    }

    componentWillMount() {
        this.props.dispatch(setTitle('Communication'));
        this.props.dispatch(setBreadcrumb('Communication'));
        this.props.dispatch(setDrawerSelected('communication'));

        this.props.dispatch(VolunteerActions.fetchAllVolunteers());
        this.props.dispatch(ContactActions.fetchAllContacts());
        this.props.dispatch(MessageActions.fetchAllMessages());
    }

    handleGroupChange(select) {
        let groupKey = _.find(GROUPS, (group) => { return group.value == select.value }).key;

        this.setState({
            group: groupKey
        });
    }
    
    sendMail(mail) {
        console.log(mail)
    }

    render() {
        return (
            <div className='content'>
                <Text type='headline5'>Send Email</Text>
                <br />

                <div className='content-2'>
                    <Select label='Send To' selectedIndex={_.findIndex(GROUPS, (group) => { return group.key == this.state.group })} onChange={(select) => this.handleGroupChange(select)} style={{ width: '30%' }}>
                        {_.map(GROUPS, (group) => {
                            return (
                                <SelectItem key={group.key}>
                                    {group.value}
                                </SelectItem>
                            );
                        })}
                    </Select>

                    <MailForm sendMail={this.sendMail} />
                </div>

                <MDCAutoInit />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        volunteers: state.volunteers.volunteers,
        contacts: state.contacts.contacts,
        messages: state.messages.messages
    };
}

export default connect(mapStateToProps)(Mail);
