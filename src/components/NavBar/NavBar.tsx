import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UnitSwitch } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import { favoritesSelector } from '../../store/selectors';

const NavBar = () => {
    const [isCelcius, setIsCelcius] = useState(true);
    const favorites = useAppSelector(favoritesSelector);

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
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="favorites">Features {favorites?.length > 0 && <span className="badge bg-secondary">{favorites?.length}</span>}</Nav.Link>
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
