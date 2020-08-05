import React, { Component } from 'react';
import {Nav, Navbar,NavItem, NavbarBrand, NavLink} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faHome, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'
class AppNav extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/"> <FontAwesomeIcon icon={faHome} />Etkinlik Yönetim Sistemi</NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/"> <FontAwesomeIcon icon={faHome} /> Anasayfa</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/user"><FontAwesomeIcon icon={faUser} /> Kullanıcı</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/admin"><FontAwesomeIcon icon={faUserAstronaut} /> Yönetici</NavLink>
                </NavItem>
                </Nav>
                </Navbar>
            </div>
        );
    }
}

export default AppNav;