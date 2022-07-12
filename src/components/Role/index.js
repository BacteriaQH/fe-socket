import { forwardRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Col, Row } from 'react-bootstrap';
import Image from '../Image';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = () => {
    return (
        <span className="d-flex flex-column bg-light border rounded-3">
            <Button to="/setting">Cài đặt</Button>
            <Button to="/logout">Đăng xuất</Button>
        </span>
    );
};

const Icon = forwardRef((props, ref) => {
    return <FontAwesomeIcon ref={ref} icon={faCircleChevronDown} />;
});

const Role = ({ showDropdown, user }) => {
    console.log(user.isAdmin);
    return (
        <Row className="mb-3 mt-3">
            <Col lg={3}>
                <Image isAvatar isMale alt="avatar" />
            </Col>
            <Col lg={8}>
                <Row>
                    <Col lg={8}>
                        <Row>{user?.name}</Row>
                        <Row>{user?.isAdmin === 1 ? 'Admin' : 'User'}</Row>
                    </Col>
                    <Col lg={2}>
                        {showDropdown && (
                            <div>
                                <Tippy
                                    placement="bottom"
                                    interactive
                                    delay="300"
                                    render={(attrs) => <Dropdown tabIndex="-1" {...attrs} />}
                                >
                                    <span>
                                        {' '}
                                        <Icon />
                                    </span>
                                </Tippy>
                            </div>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Role;
