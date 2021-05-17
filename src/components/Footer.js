import React from 'react';
import { Container } from "react-bootstrap";

function Footer() {
    return (
        <Container fluid className='app-footer'>
            <div className='p-3'>
                <p className='text-center'>
                    Made with <i className="fa fa-heart"/>
                </p>
            </div>
        </Container>
    );
}

export default Footer;
