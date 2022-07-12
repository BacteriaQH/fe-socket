import { useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';

function Login({ socket }) {
    const redirect = useNavigate();
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });

    socket.on('connect', () => {
        socket.emit('id', socket.id);
    });
    const handleClick = (e) => {
        e.preventDefault();
        socket.emit('login', data);
    };
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
    const handleNavigate = () => {
        redirect('/');
    };
    socket.on('login success', (data) => {
        setMessage({
            err: false,
            mess: 'Đăng nhập thành công, chuyển trang sau 1s ',
        });
        setTimeout(handleNavigate, 2000);
        let entries = Object.entries(data);
        entries.map(([key, val]) => {
            localStorage.setItem(key, val);
            return true;
        });
    });

    socket.on('login err', (data) => {
        setMessage({
            err: true,
            mess: `Đăng nhập thất bại. Lỗi: ${data}`,
        });
    });
    return (
        <>
            <Title title="Đăng nhập" />
            <Row>
                <Col></Col>
                <Col>
                    {message ? (
                        <div className={message.err ? 'text-danger' : 'text-success'}>{message.mess}</div>
                    ) : (
                        <></>
                    )}
                    <FormGroup as={Col}>
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" name="email" placeholder="Nhập Email" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup as={Col}>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            name="password"
                            placeholder="Nhập Password"
                            onChange={handleChange}
                            autoComplete="false"
                        />
                    </FormGroup>
                    <Button onClick={handleClick} className="btn btn-primary mt-3">
                        Login
                    </Button>
                </Col>
                <Col></Col>
            </Row>
        </>
    );
}

export default Login;
