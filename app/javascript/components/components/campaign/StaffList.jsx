import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Pager from '../common/Pager';

const PER_PAGE = 10;

export default class StaffList extends React.Component {

    renderList() {
        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);

        return (
            <ul className='mdc-list mdc-list--two-line'>
                {_.slice(this.props.staff, page * PER_PAGE, (page + 1) * PER_PAGE).map((member, index) => {
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
