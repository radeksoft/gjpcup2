import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'wouter';


export const AppHeader: React.FC = () => {
    return (
        <Navbar expand="lg">
            <Container className='px-4 py-2'>
                <Link href='/'><Navbar.Brand>GJP Cup</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls='navbar'/>
                <Navbar.Collapse id='navbar' className='justify-content-end'>
                    <Nav className="me-auto">
                        <Link href='/'><Nav.Link>Hlavní stránka</Nav.Link></Link>
                        <Link href='/teams'><Nav.Link>Týmy a hráči</Nav.Link></Link>
                        <Link href='/games'><Nav.Link>Všechny zápasy</Nav.Link></Link>
                        <Link href='/table'><Nav.Link>Velká tabulka</Nav.Link></Link>
                        <Link href='/bufet'><Nav.Link>Bufet</Nav.Link></Link>
                        <Link href='/voting'><Nav.Link>Hlasování</Nav.Link></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
