import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UnitSwitch } from '../../components';

const NavBar = () => {
    const [isCelcius, setIsCelcius] = useState(true);

    const handleUnitChange = (e: any) => {
        setIsCelcius(prev => !prev);
    };

    return (
        <Navbar className="navbar navbar-light" collapseOnSelect expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/" className="fs-4 fw-bold">Weather App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="pt-1">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <UnitSwitch />
                    </Nav>
                    {/*<Nav>*/}
                    {/*    <Nav.Link href="/" className="fw-light">Developed By Kir Ter</Nav.Link>*/}
                    {/*</Nav>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
