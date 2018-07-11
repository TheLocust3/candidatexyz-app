import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { history } from '../../../constants';

export default class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = { selectedIndex: 0, up: true };
    }

    sort(rows) {
        let sorted = _.sortBy(rows, (row) => { 
            let key = this.props.keys[this.state.selectedIndex];
            return _.isFunction(key) ? key(row) : row[key];
        });
        
        return this.state.up ? sorted : _.reverse(sorted);
    }

    displayedRows() {
        let { rows, rowsPerPage } = this.props;

        let parsed = queryString.parse(location.search);
        let page = _.isEmpty(parsed.page) ? 0 : Number(parsed.page);
    
        return this.sort(_.slice(rows, page * rowsPerPage, (page + 1) * rowsPerPage));
    }

    onRowClick(id) {
        history.push(`${this.props.to}${id}`);
    }

    onHeaderClick(header, index) {
        if (index == this.state.selectedIndex) {
            this.setState({
                up: !this.state.up
            });
        } else {
            this.setState({
                selectedIndex: index,
                up: true
            });
        }
    }

    renderArrow() {
        if (this.state.up) {
            return (
                <span className='header-arrow'>
                    &#x22C0;
                </span>
            );
        } else {
            return (
                <span className='header-arrow'>
                    &#x22C1;
                </span>
            );
        }
    }

    renderRows() {
        return (
            this.displayedRows().map((row, index) => {
                return (
                    <tr key={index} className='selectable' onClick={() => this.onRowClick(row.id)}>
                        {this.props.keys.map((key) => {
                            let value = _.isFunction(key) ? key(row) : row[key];
                            
                            return (
                                <td key={key}>
                                    <Text type='body2'>{value}</Text>
                                </td>
                            );
                        })}
                    </tr>
                );
            })
        );
    }

    renderHeader() {
        return (
            <tr>
                {this.props.headers.map((header, index) => {
                    return (
                        <th className='selectable' key={header} onClick={() => this.onHeaderClick(header, index)}>
                            <Text className='header-text' type='subtitle1'>{header} {index == this.state.selectedIndex ? this.renderArrow() : ''}</Text>
                        </th>
                    );
                })}
            </tr>
        );
    }

    render() {
        let { rows, rowsPerPage, headers, keys, to, ...props } = this.props;

        return (
            <table {...props}>
                <thead>
                    {this.renderHeader()}
                </thead>
                
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
}

Table.propTypes = {
    rows: PropTypes.array,
    rowsPerPage: PropTypes.number,
    headers: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    to: PropTypes.string.isRequired
};
