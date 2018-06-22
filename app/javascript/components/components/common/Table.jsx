import React from 'react';
import PropTypes from 'prop-types';

import { history } from '../../../constants';

import Text from '../common/Text';

export default class Table extends React.Component {

    onRowClick(id) {
        history.push(`${this.props.to}${id}`);
    }

    renderRows() {
        return (
            this.props.rows.map((row, index) => {
                return (
                    <tr key={index} className='selectable' onClick={() => this.onRowClick(row.id)}>
                        {this.props.keys.map((key) => {
                            return (
                                <td key={key}>
                                    <Text type='body2'>{row[key]}</Text>
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
                {this.props.headers.map((header) => {
                    return (
                        <th key={header}>
                            <Text type='subtitle1'>{header}</Text>
                        </th>
                    );
                })}
            </tr>
        );
    }

    render() {
        let { rows, headers, keys, to, ...props } = this.props;

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
    headers: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    to: PropTypes.string.isRequired
};
