import { Col, Container, Row } from 'react-bootstrap';

import './Header.css';
import Role from '../Role';

function Header({ user }) {
    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col lg={9} className="d-flex justify-content-center align-items-center">
                            <h2 className="text-title">Socket Digital</h2>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}></Col>
                <Col lg={3}>
                    <Row>
                        {' '}
                        <Role showDropdown={true} user={user} />
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
