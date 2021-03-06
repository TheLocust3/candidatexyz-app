import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Pager from '../common/Pager';

const PER_PAGE = 10;

export default class StaffList extends React.Component {

    renderPosition(member) {
        if (_.isEmpty(member.position)) return '';

        return `(${member.position})`;
    }

    renderName(member) {
        if (member.created) {
            return `${member.firstName} ${member.lastName} ${this.renderPosition(member)}`;
        }

        return <i>Invited</i>;
    }

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line content-max'>
                {_.slice(_.sortBy(this.props.staff, (staff) => { return staff.firstName }), page * PER_PAGE, (page + 1) * PER_PAGE).map((member, index) => {
                    return (
                        <Link key={index} className='unstyled-link-black link-no-hover' to={`/campaign/staff/${member.id}`}>
                            <li className='mdc-list-item'>
                                <span className='mdc-list-item__text'>
                                    {this.renderName(member)}

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

    render() {
        if (_.isEmpty(this.props.staff)) return null;

        return (
            <div>
                {this.renderList()}
                <br />

                <Pager elements={this.props.staff} elementsPerPage={PER_PAGE} baseLink='/campaign/staff' />
            </div>
        );
    }
}

StaffList.propTypes = {
    staff: PropTypes.array
};
