import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDCTemporaryDrawer } from '@material/drawer';

import { MAX_MOBILE_WIDTH } from '../../../constants';
import AuthApi from '../../../api/auth-api';

import Text from '../common/Text';

class Navbar extends React.Component {

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

    onSignOutClick() {
        AuthApi.signOut().then(() => {
            window.location.href = '/';
        });
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
                    <Text type='body1' className='mdc-drawer__toolbar-spacer'>candidateXYZ</Text>
                    
                    <div className='mdc-drawer__content'>
                        <nav className='mdc-list'>
                            <Link className={`mdc-list-item ${document.location.pathname == '/' ? 'mdc-list-item--activated' : ''}`} to='/' data-mdc-auto-init='MDCRipple'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>
                                <Text type='body2'>Home</Text>
                            </Link>

                            <Link className={`mdc-list-item ${document.location.pathname == '/settings' ? 'mdc-list-item--activated' : ''}`} to='/settings' data-mdc-auto-init='MDCRipple'>
                                <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>
                                <Text type='body2'>Settings</Text>
                            </Link>
                        </nav>
                    </div>
                </nav>

                <div className='content-wrapper'>
                    <header className='mdc-toolbar toolbar-desktop'>
                        <div className='mdc-toolbar__row'>
                            <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                                <Text type='title' className='mdc-toolbar__title'>{title}</Text>
                            </section>

                            <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
                                <Text type='body2' style={{ marginRight: '3%' }}>{this.props.user.firstName} {this.props.user.lastName}</Text>

                                <Link className='unstyled-link unstyled-link-black' onClick={this.onSignOutClick.bind(this)} to='#'><Text type='body2'>Sign Out</Text></Link>
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
                            <Link to='/' className='unstyled-link'><Text type='body1'>candidateXYZ</Text></Link>
                        </section>

                        <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                            <a href='#' className='material-icons mdc-toolbar__menu-icon navbar-menu-icon' onClick={this.onMenuClick.bind(this)}>menu</a>
                        </section>
                    </div>
                </header>

                <aside className='mdc-drawer mdc-drawer--temporary' id='mobile-navbar'>
                    <nav className='mdc-drawer__drawer'>
                        <header className='mdc-drawer__header'>
                            <Text type='title' className='mdc-drawer__header-content mdc-theme--primary-bg' style={{ color: 'white' }}>
                                candidateXYZ
                            </Text>
                        </header>

                        <nav className='mdc-drawer__content mdc-list-group'>
                            <div className='mdc-list'>
                                <Link className='mdc-list-item' to='/' onClick={this.onLinkClick.bind(this)} data-mdc-auto-init='MDCRipple'>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>
                                    <Text type='body2'>Home</Text>
                                </Link>

                                <Link className='mdc-list-item' to='/settings' onClick={this.onLinkClick.bind(this)} data-mdc-auto-init='MDCRipple'>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>
                                    <Text type='body2'>Settings</Text>
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

function mapStateToProps(state) {
    return {
        user: state.users.currentUser
    };
}

export default connect(mapStateToProps)(Navbar);
