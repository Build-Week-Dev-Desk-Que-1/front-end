import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Header = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  let history = useHistory();

  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    toggleNavbar();
    history.push("/login");
  };

  return (
    <div className="header">
      <Navbar className="headerNavBar" color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          <h1 className="logo">Dev Desk</h1>
        </NavbarBrand>

        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={toggleNavbar} tag={Link} to="/signup">
                <div className="menu-links">Sign Up</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleNavbar} tag={Link} to="/login">
                <div className="menu-links">Log In</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logout} tag={Link} to="/logout">
                <div className="menu-links">Log Out</div>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;