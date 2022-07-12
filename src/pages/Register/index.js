import { useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';

const Register = ({ socket }) => {
    const redirect = useNavigate();
    const [message, setMessage] = useState({
        err: false,
        mes: '',
    });
    socket.on('connect', () => {
        socket.emit('id', socket.id);
    });
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        age: 0,
        address: '',
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
    const handleClick = (e) => {
        e.preventDefault();
        socket.emit('register', data);
    };
    socket.on('register success', () => {
        setMessage({
            err: false,
            mes: 'Đăng ký thành công, chuyển trang sau 1s',
        });

        setTimeout(handleNavigate, 2000);
    });
    const handleNavigate = () => {
        redirect('/login');
    };
    socket.on('register error', () => {
        setMessage({
            err: true,
            mes: 'Đăng ký không thành công, hãy thử lại',
        });
    });
    return (
        <>
            <Row className="m-3">
                <Col></Col>
                <Col> </Col>
                <Col></Col>
            </Row>
            <Title title="Đăng ký" />
            <Row className="m-3">
                <Col></Col>
                <Col>
                    {message ? (
                        <div className={message.err ? 'text-danger' : 'text-success'}>{message.mes}</div>
                    ) : (
                        <></>
                    )}
                    <FormGroup as={Col}>
                        <FormLabel>Tên</FormLabel>
                        <FormControl type="text" name="name" placeholder="Nhập Tên" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Email</FormLabel>
                        <FormControl type="text" name="email" placeholder="Nhập Email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            name="password"
                            placeholder="Nhập Password"
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Tuổi</FormLabel>
                        <FormControl type="number" name="age" placeholder="Nhập Tuổi" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Điạ chỉ</FormLabel>
                        <FormControl type="text" name="address" placeholder="Nhập Điạ chỉ" onChange={handleChange} />
                    </FormGroup>
                    <Button onClick={handleClick} className="btn btn-primary mt-3">
                        Đăng ký
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
};

export default Register;
