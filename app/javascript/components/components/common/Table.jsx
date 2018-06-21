import React from 'react';
import PropTypes from 'prop-types';

export default class Table extends React.Component {

    renderRows() {
        return (
            this.props.rows.map((row, index) => {
                return (
                    <tr key={index}>
                        {this.props.keys.map((key) => {
                            return <td key={key}>{row[key]}</td>;
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
                        <th key={header}>{header}</th>
                    );
                })}
            </tr>
        );
    }

    render() {
        let { rows, headers, keys, ...props } = this.props;

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
    keys: PropTypes.array.isRequired
};
