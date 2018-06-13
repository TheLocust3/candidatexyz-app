import React from 'react';
import PropTypes from 'prop-types';

export default class Navbar extends React.Component {

    render() {
        return (
            <div className='content-root'>
                <nav className='mdc-drawer mdc-drawer--permanent mdc-typography'>
                    <div className='mdc-drawer__toolbar-spacer'>candidateXYZ</div>
                    
                    <div className='mdc-drawer__content'>
                        <nav className='mdc-list'>
                            <a className='mdc-list-item mdc-list-item--activated' href='#'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>inbox</i>Inbox
                            </a>
                            <a className='mdc-list-item' href='#'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>star</i>Star
                            </a>
                        </nav>
                    </div>
                </nav>

                <div className='content'>
                    <header className='mdc-toolbar'>
                        <div className='mdc-toolbar__row'>
                            <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                                <span className='mdc-toolbar__title'>Title</span>
                            </section>
                        </div>
                    </header>

                    {this.props.children}
                </div>
            </div>
        );
    }
}

Navbar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired    
};
