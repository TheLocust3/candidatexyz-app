import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class StaffList extends React.Component {

    render() {
        if (_.isEmpty(this.props.staff)) return null;

        return (
            <ul className='mdc-list mdc-list--two-line'>
                {this.props.staff.map((member, index) => {
                    return (
                        <Link key={index} className='unstyled-link-black link-no-hover' to={`/campaign/staff/${member.id}`}>
                            <li className='mdc-list-item'>
                                <span className='mdc-list-item__text'>
                                    {member.firstName} {member.lastName}

                                    <span className='mdc-list-item__secondary-text'>
                                        {member.email}<br />
                                    </span>
                                </span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        );
    }
}

StaffList.propTypes = {
    staff: PropTypes.array
};
