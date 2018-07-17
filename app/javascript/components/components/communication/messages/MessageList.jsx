import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import Pager from '../../common/Pager';
import MessageThumbnail from './MessageThumbnail';

const PER_PAGE = 10;

export default class MessageList extends React.Component {

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line'>
                {_.slice(_.reverse(_.sortBy(this.props.messages, (message) => { return message.createdAt })), page * PER_PAGE, (page + 1) * PER_PAGE).map((message, index) => {
                    return (
                        <div key={index}>
                            <MessageThumbnail message={message} />
                        </div>
                    );
                })}
            </ul>
        );
    }

    renderNone() {
        return <Text type='body1'>You currently have no messages!</Text>;
    }

    render() {
        if (_.isEmpty(this.props.messages)) {
            return this.renderNone();
        } else {
            return (
                <div>
                    {this.renderList()}
                    <br />

                    <Pager elements={this.props.messages} elementsPerPage={PER_PAGE} baseLink='/communication/messages' />
                </div>
            );
        }
    }
}

MessageList.propTypes = {
    messages: PropTypes.array
};
