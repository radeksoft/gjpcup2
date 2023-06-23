import React from 'react';
import Container from 'react-bootstrap/Container';

export const AppFooter: React.FC = () => {
    return (
        <footer className=''>
            <Container className='text-center p-3'>
                <span>Vytvořil <a href='https://radeksoft.cz/'>Radeksoft</a>.</span>
            </Container>
        </footer>
    );
};
