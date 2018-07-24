import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import Pager from '../common/Pager';
import Notification from './Notification';

const PER_PAGE = 10;

export default class NotificationList extends React.Component {

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line content-max'>
                {_.slice(_.reverse(_.sortBy(this.props.notifications, (notification) => { return notification.createdAt })), page * PER_PAGE, (page + 1) * PER_PAGE).map((notification) => {
                    return (
                        <div key={notification.id}>
                            <Notification notification={notification} refresh={this.props.refresh} />
                        </div>
                    );
                })}
            </ul>
        );
    }

    renderNone() {
        return <Text type='body1'>You currently have no notifications!</Text>;
    }

    render() {
        if (_.isEmpty(this.props.notifications)) {
            return this.renderNone();
        } else {
            return (
                <div>
                    {this.renderList()}
                    <br />

                    <Pager elements={this.props.notifications} elementsPerPage={PER_PAGE} baseLink='/notifications' hideEmpty={true} />
                </div>
            );
        }
    }
}

NotificationList.propTypes = {
    notifications: PropTypes.array,
    refresh: PropTypes.func.isRequired
};
