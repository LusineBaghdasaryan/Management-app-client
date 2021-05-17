import React from 'react';
import {Container} from "react-bootstrap";

function Header() {
    return (
            <Container fluid className='app-header'>
                <div className='app-name'>
                    Client Management
                </div>
            </Container>
    );
}

export default Header;
