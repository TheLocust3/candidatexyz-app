import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from 'candidatexyz-common-js/lib/elements';

export default class InKind extends React.Component {

    renderEmail() {
        if (_.isEmpty(this.props.inKind.email)) return 'N/A';

        return (
            <a className='link' href={`mailto:${inKind.email}`}>{inKind.email}</a>
        );
    }

    render() {
        let inKind = this.props.inKind;

        return (
            <div>
                <Text type='body1'>Description</Text>
                <Text type='body2'>{inKind.description}</Text>
                <br />

                <Text type='body1'>Value</Text>
                <Text type='body2'>{inKind.valueString}</Text>
                <br />

                <Text type='body1'>Address</Text>
                <Text type='body2'>{inKind.address}, {inKind.city}, {inKind.state}{_.isEmpty(inKind.country) ? '' : `, ${inKind.country}`}</Text>
                <br />

                <Text type='body1'>Contact</Text>
                <Text type='body2'>Email: {this.renderEmail()}</Text>
                <Text type='body2'>Phone Number: {_.isEmpty(inKind.phoneNumber) ? 'N/A' : inKind.phoneNumber}</Text>
                <br />

                <Text type='body1'>Date Received</Text>
                <Text type='body2'>{moment(inKind.datePaid).format('MM/DD/YYYY')}</Text>
                <br />
            </div>
        )
    }
}

InKind.propTypes = {
    inKind: PropTypes.object
};
