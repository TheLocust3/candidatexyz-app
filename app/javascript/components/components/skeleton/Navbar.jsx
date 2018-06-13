import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MDCTemporaryDrawer } from '@material/drawer';

import { MAX_MOBILE_WIDTH } from '../../../constants';

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = { lastRenderedWidth: $(document).width() };
    }

    updateDimensions() {
        let width = $(document).width();
        if ((this.state.lastRenderedWidth > MAX_MOBILE_WIDTH && width < MAX_MOBILE_WIDTH) || (this.state.lastRenderedWidth < MAX_MOBILE_WIDTH && width > MAX_MOBILE_WIDTH)) {
            this.setState({
                lastRenderedWidth: width
            });

            this.forceUpdate();
        }
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.updateDimensions());
    }

    onMenuClick() {
        event.preventDefault()

        let drawer = new MDCTemporaryDrawer(document.querySelector('#mobile-navbar'));
        drawer.open = true;
    }

    onLinkClick() {
        let drawer = new MDCTemporaryDrawer(document.querySelector('#mobile-navbar'));
        drawer.open = false;
    }

    renderDesktop() {
        let title = '';
        if (document.location.pathname == '/') {
            title = 'Home';
        } else if (document.location.pathname == '/settings') {
            title = 'Settings';
        }

        return (
            <div className='content-root'>
                <nav className='mdc-drawer mdc-drawer--permanent mdc-typography drawer-desktop'>
                    <div className='mdc-drawer__toolbar-spacer'>candidateXYZ</div>
                    
                    <div className='mdc-drawer__content'>
                        <nav className='mdc-list'>
                            <Link className={`mdc-list-item ${document.location.pathname == '/' ? 'mdc-list-item--activated' : ''}`} to='/' data-mdc-auto-init='MDCRipple'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>Home
                            </Link>

                            <Link className={`mdc-list-item ${document.location.pathname == '/settings' ? 'mdc-list-item--activated' : ''}`} to='/settings' data-mdc-auto-init='MDCRipple'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>Settings
                            </Link>
                        </nav>
                    </div>
                </nav>

                <div className='content-wrapper'>
                    <header className='mdc-toolbar toolbar-desktop'>
                        <div className='mdc-toolbar__row'>
                            <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                                <span className='mdc-toolbar__title'>{title}</span>
                            </section>
                        </div>
                    </header>

                    {this.props.children}
                </div>
            </div>
        );
    }

    renderMobile() {
        return (
            <div>
                <header className='mdc-toolbar mdc-toolbar--fixed navbar'>
                    <div className='mdc-toolbar__row'>
                        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                            <Link to='/' className='unstyled-link'>candidateXYZ</Link>
                        </section>

                        <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                            <a href='#' className='material-icons mdc-toolbar__menu-icon navbar-menu-icon' onClick={this.onMenuClick.bind(this)}>menu</a>
                        </section>
                    </div>
                </header>

                <aside className='mdc-drawer mdc-drawer--temporary' id='mobile-navbar'>
                    <nav className='mdc-drawer__drawer'>
                        <header className='mdc-drawer__header'>
                            <div className='mdc-drawer__header-content mdc-theme--primary-bg' style={{ color: 'white' }}>
                                candidateXYZ
                            </div>
                        </header>

                        <nav className='mdc-drawer__content mdc-list-group'>
                            <div className='mdc-list'>
                                <Link className='mdc-list-item' to='/' onClick={this.onLinkClick.bind(this)} data-mdc-auto-init='MDCRipple'>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>Home
                                </Link>

                                <Link className='mdc-list-item' to='/settings' onClick={this.onLinkClick.bind(this)} data-mdc-auto-init='MDCRipple'>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>Settings
                                </Link>
                            </div>
                        </nav>
                    </nav>
                </aside>

                {this.props.children}
            </div>
        )
    }

    render() {
        if (this.state.lastRenderedWidth < MAX_MOBILE_WIDTH) {
            return this.renderMobile();
        } else {
            return this.renderDesktop();
        }
    }
}

Navbar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]).isRequired
};
