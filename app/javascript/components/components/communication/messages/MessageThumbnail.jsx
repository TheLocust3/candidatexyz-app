import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class MessageThumbnail extends React.Component {

    renderThumbnail() {
        let message = this.props.message;

        let denseClassName = this.props.dense ? 'resource-list-item--dense' : '';
        let titleType = this.props.dense ? 'body2' : 'body1';
        let subtitleType = this.props.dense ? 'caption' : 'body2';

        return (
            <Link className='unstyled-link-black link-no-hover' to={`/communication/messages/${message.id}`}>
                <li className={`mdc-list-item resource-list-item ${denseClassName}`}>
                    <span className='mdc-list-item__text'>
                        <Text type={titleType}>{message.firstName} {message.lastName}</Text>

                        <span className='mdc-list-item__secondary-text'>
                            <Text type={subtitleType}>{message.subject}</Text>
                        </span>
                    </span>
                </li>
            </Link>
        );
    }

    render() {
        if (_.isEmpty(this.props.message)) {
            return (
                <Text type='body2'>
                    None
                </Text>
            )
        } else {
            return this.renderThumbnail();
        }
    }
}

MessageThumbnail.propTypes = {
    message: PropTypes.object,
    dense: PropTypes.bool
};
