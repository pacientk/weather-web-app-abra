import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UnitSwitch } from '../../components';
import { useAppSelector } from '../../hooks/redux';
import { favoritesSelector } from '../../store/selectors';

const NavBar = () => {
    const favorites = useAppSelector(favoritesSelector);

    return (
        <Navbar className="navbar navbar-light bg-white" collapseOnSelect expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/" className="fs-4 fw-bold">Weather App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="pt-1">
                    <Nav className="me-auto">
                        <Link to="/" className="text-decoration-none text-secondary mx-2">
                            Home
                        </Link>
                        <Link to="/favorites" className="text-decoration-none text-secondary mx-2">
                            Features {favorites?.length > 0 && <span className="badge bg-secondary">{favorites?.length}</span>}
                        </Link>
                    </Nav>
                    <Nav>
                        <UnitSwitch />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
