import { Col, Row } from 'react-bootstrap';

import Image from '../Image';

import images from '../../assets/image';
function Footer() {
    return (
        <Row className="bg-light mt-3 sticky-bottom">
            <Col lg={4} className="text-center">
                &copy;<a href="/">SiteName</a>, All Right Reserved.
            </Col>
            <Col lg={4} className="text-center">
                Designed By<a href="/">JS Team</a>
            </Col>
            <Col lg={4} className="text-center">
                <Image src={images.facebookIcon} alt="facebook" isIcon />{' '}
                <Image src={images.githubIcon} alt="github" isIcon />
            </Col>
        </Row>
    );
}

export default Footer;
