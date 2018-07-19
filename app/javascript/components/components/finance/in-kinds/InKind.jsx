import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class InKind extends React.Component {

    render() {
        let inKind = this.props.inKind;

        return (
            <div>
                <Text type='body1'>From Whom</Text>
                <Text type='body2'>{inKind.fromWhom}</Text>
                <br />

                <Text type='body1'>Description</Text>
                <Text type='body2'>{inKind.description}</Text>
                <br />

                <Text type='body1'>Value</Text>
                <Text type='body2'>{inKind.valueString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{inKind.address}, {inKind.city}, {inKind.state}, {inKind.country}</Text>
                <br />

                <Text type='body1'>Date Received</Text>
                <Text type='body2'>{moment(inKind.datePaid).format('MM/DD/YYYY')}</Text>
                <br />

                <Text type='body1'>Email</Text>
                <Text type='body2'>{_.isEmpty(inKind.email) ? 'N/A' : inKind.email}</Text>
                <br />

                <Text type='body1'>Phone Number</Text>
                <Text type='body2'>{_.isEmpty(inKind.phoneNumber) ? 'N/A' : inKind.phoneNumber}</Text>
                <br />
            </div>
        )
    }
}

InKind.propTypes = {
    inKind: PropTypes.object
};
