import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MDCTemporaryDrawer } from '@material/drawer';
import { AuthApi } from 'candidatexyz-common-js';
import { Text } from 'candidatexyz-common-js/lib/elements';

import { MAX_MOBILE_WIDTH } from '../../../constants';

import CompanyTitle from '../common/CompanyTitle';
import NotificationButton from '../../containers/notifications/NotificationButton'

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

        this.setupDropdowns();
    }

    componentDidUpdate() {
        this.handleDropdowns();
    }

    setupDropdowns() {
        if (this.props.drawerSelected.item == 'communication') {
            $('#communication-drop-down').show();
            $('#campaign-drop-down').hide();
            $('#finance-drop-down').hide();
        } else if (this.props.drawerSelected.item == 'campaign') {
            $('#campaign-drop-down').show();
            $('#communication-drop-down').hide();
            $('#finance-drop-down').hide();
        } else if (this.props.drawerSelected.item == 'finance') {
            $('#finance-drop-down').show();
            $('#communication-drop-down').hide();
            $('#campaign-drop-down').hide();
        } else {
            $('#communication-drop-down').hide();
            $('#campaign-drop-down').hide();
            $('#finance-drop-down').hide();
        }
    }

    handleDropdowns() {
        if (this.props.drawerSelected.item == 'communication') {
            $('#communication-drop-down').slideDown(200);
            $('#campaign-drop-down').slideUp(200);
            $('#finance-drop-down').slideUp(200);
        } else if (this.props.drawerSelected.item == 'campaign') {
            $('#campaign-drop-down').slideDown(200);
            $('#communication-drop-down').slideUp(200);
            $('#finance-drop-down').slideUp(200);
        } else if (this.props.drawerSelected.item == 'finance') {
            $('#finance-drop-down').slideDown(200);
            $('#communication-drop-down').slideUp(200);  
            $('#campaign-drop-down').slideUp(200);  
        } else {
            $('#communication-drop-down').slideUp(200);
            $('#campaign-drop-down').slideUp(200);
            $('#finance-drop-down').slideUp(200);
        }
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

    renderDrawerList() {
        let item = this.props.drawerSelected.item;
        let subItem = this.props.drawerSelected.subItem;
        let disabled = this.props.drawerDisabled;

        return (
            <div>
                <Link className={`mdc-list-item ${item == 'home' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'home' ? 'mdc-list-item-text--activated' : ''}`}>Home</Text>
                </Link>

                <Link className={`mdc-list-item ${item == 'website' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/website'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>desktop_windows</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'website' ? 'mdc-list-item-text--activated' : ''}`}>Website</Text>
                </Link>

                <Link className={`mdc-list-item ${item == 'communication' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/communication'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>person</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'communication' ? 'mdc-list-item-text--activated' : ''}`}>Communication</Text>
                </Link>

                <div id='communication-drop-down'>
                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/communication/volunteers'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'volunteers' ? 'drawer-sub-item-text--activated' : ''}`}>Volunteers</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/communication/sign-ups'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'signUps' ? 'drawer-sub-item-text--activated' : ''}`}>Sign Ups</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/communication/messages'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'messages' ? 'drawer-sub-item-text--activated' : ''}`}>Messages</Text>
                    </Link>
                </div>

                <Link className={`mdc-list-item ${item == 'finance' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/finance'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>attach_money</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'finance' ? 'mdc-list-item-text--activated' : ''}`}>Finance</Text>
                </Link>

                <div id='finance-drop-down'>
                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/finance/reports'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'reports' ? 'drawer-sub-item-text--activated' : ''}`}>Reports</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/finance/donations'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'donations' ? 'drawer-sub-item-text--activated' : ''}`}>Donations</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/finance/expenditures'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'expenditures' ? 'drawer-sub-item-text--activated' : ''}`}>Expenses</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/finance/liabilities'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'liabilities' ? 'drawer-sub-item-text--activated' : ''}`}>Debts</Text>
                    </Link>
                </div>

                <Link className={`mdc-list-item ${item == 'campaign' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/campaign'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>domain</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'campaign' ? 'mdc-list-item-text--activated' : ''}`}>Campaign</Text>
                </Link>

                <div id='campaign-drop-down'>
                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/campaign/committee'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'committee' ? 'drawer-sub-item-text--activated' : ''}`}>Committee</Text>
                    </Link>

                    <Link className='drawer-sub-item unstyled-link unstyled-link-black' to={disabled ? '#' : '/campaign/staff'}>
                        <Text type='body2' className={`drawer-sub-item-text ${subItem == 'staff' ? 'drawer-sub-item-text--activated' : ''}`}>Staff</Text>
                    </Link>
                </div>

                <Link className={`mdc-list-item ${item == 'settings' ? 'mdc-list-item--activated' : ''}`} to={disabled ? '#' : '/settings'}>
                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>
                    <Text type='body2' className={`mdc-list-item-text ${item == 'settings' ? 'mdc-list-item-text--activated' : ''}`}>Settings</Text>
                </Link>
            </div>
        );
    }

    renderDesktop() {
        return (
            <div className='content-root'>
                <nav className='mdc-drawer mdc-drawer--permanent mdc-typography drawer-desktop'>
                    <Text type='body1' className='mdc-drawer__toolbar-spacer'><CompanyTitle type='body1' /></Text>
                    
                    <div className='mdc-drawer__content'>
                        <nav className='mdc-list'>
                            {this.renderDrawerList()}
                        </nav>
                    </div>
                </nav>

                <div className='content-wrapper'>
                    <header className='mdc-toolbar toolbar-desktop'>
                        <div className='mdc-toolbar__row'>
                            <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                                <Text type='title' className='mdc-toolbar__title'>{this.props.breadcrumb}</Text>
                            </section>

                            <section className='mdc-toolbar__section mdc-toolbar__section--align-end'>
                                <Text type='body2' style={{ marginRight: '3%' }}>{this.props.user.firstName} {this.props.user.lastName}</Text>

                                <Link className='unstyled-link unstyled-link-black' onClick={this.onSignOutClick.bind(this)} to='#'><Text type='body2'>Sign Out</Text></Link>

                                <NotificationButton />
                            </section>
                        </div>
                    </header>

                    {this.props.children}
                </div>
            </div>
        );
    }

    renderMobile() {
        let disabled = this.props.drawerDisabled;

        return (
            <div className='content-root'>
                <header className='mdc-toolbar mdc-toolbar--fixed navbar'>
                    <div className='mdc-toolbar__row'>
                        <section className='mdc-toolbar__section mdc-toolbar__section--align-start'>
                            <Link to='/' className='unstyled-link'><CompanyTitle type='body1' invert/></Link>
                        </section>

                        <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
                            <a href='#' className='material-icons mdc-toolbar__menu-icon navbar-menu-icon' onClick={this.onMenuClick.bind(this)}>menu</a>
                        </section>
                    </div>
                </header>

                <aside className='mdc-drawer mdc-drawer--temporary' id='mobile-navbar'>
                    <nav className='mdc-drawer__drawer'>
                        <header className='mdc-drawer__header'>
                            <div className='mdc-drawer__header-content mdc-theme--primary-bg'>
                                <CompanyTitle type='title' invert/>
                            </div>
                        </header>

                        <nav className='mdc-drawer__content mdc-list-group'>
                            <div className='mdc-list'>
                                <Link className='mdc-list-item' to={disabled ? '#' : '/'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>home</i>
                                    <Text type='body2'>Home</Text>
                                </Link>

                                <Link className='mdc-list-item' to={disabled ? '#' : '/website'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>desktop_windows</i>
                                    <Text type='body2'>Website</Text>
                                </Link>

                                <Link className='mdc-list-item' to={disabled ? '#' : '/communication'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>person</i>
                                    <Text type='body2'>Communication</Text>
                                </Link>

                                <Link className='mdc-list-item' to={disabled ? '#' : '/finance'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>attach_money</i>
                                    <Text type='body2'>Finance</Text>
                                </Link>

                                <Link className='mdc-list-item' to={disabled ? '#' : '/campaign'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>domain</i>
                                    <Text type='body2'>Campaign</Text>
                                </Link>

                                <Link className='mdc-list-item' to={disabled ? '#' : '/settings'} onClick={this.onLinkClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>settings</i>
                                    <Text type='body2'>Settings</Text>
                                </Link>

                                <Link className='mdc-list-item' to='#' onClick={this.onSignOutClick.bind(this)}>
                                    <i className='material-icons mdc-list-item__graphic' aria-hidden='true'>cancel</i>
                                    <Text type='body2'>Sign Out</Text>
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
        user: state.users.currentUser,
        breadcrumb: state.global.breadcrumb,
        drawerSelected: state.global.drawerSelected,
        drawerDisabled: state.global.drawerDisabled
    };
}

export default connect(mapStateToProps)(Navbar);
