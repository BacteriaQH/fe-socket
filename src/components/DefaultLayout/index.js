import Header from '../Header';
import Footer from '../Footer';
import { Col, Row } from 'react-bootstrap';
import Sidebar from '../Sidebar';
function DefaultLayout({ children, user }) {
    return (
        <>
            <Row className="bg-light">
                <Header user={user} />
            </Row>
            <Row>
                <Col lg={3} className="bg-light ms-3 me-4">
                    <Sidebar user={user} />
                </Col>
                <Col lg={8}>
                    <div style={{ minHeight: '640px' }}> {children}</div>
                    <Footer />
                </Col>
            </Row>
        </>
    );
}

export default DefaultLayout;
