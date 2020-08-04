import React, { Component } from 'react';
import {Nav, Navbar,NavItem, NavbarBrand, NavLink} from 'reactstrap';

class AppNav extends Component {
    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Etkinlik Yönetim Sistemi</NavbarBrand>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/">Anasayfa</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/user">Kullanıcı</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="/admin">Yönetici</NavLink>
                </NavItem>
                </Nav>
                </Navbar>
            </div>
        );
    }
}

export default AppNav;