import { useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Title from '../../components/Title';

function AddUnit({ socket }) {
    const id = localStorage.getItem('id');
    const name = localStorage.getItem('name');
    const socket_id = socket.id;
    const [data, setData] = useState({
        name: '',
        MST: '',
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
        setData({
            ...data,
            admin: id,
            adminName: name,
            socket_id: socket_id,
            user: [id],
        });
        socket.emit('add-unit', data);
    };
    return (
        <>
            <Title title={'Thêm Đơn vị'} />
            <FormGroup as={Col}>
                <FormLabel>Tên</FormLabel>
                <FormControl type="text" name="name" placeholder="Nhập Tên" onChange={handleChange} />
            </FormGroup>
            <FormGroup as={Col}>
                <FormLabel>MST</FormLabel>
                <FormControl type="text" name="MST" placeholder="Nhập MST" onChange={handleChange} />
            </FormGroup>
            <FormGroup as={Col}>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl type="text" name="address" placeholder="Nhập Điạ chỉ" onChange={handleChange} />
            </FormGroup>
            <Button onClick={handleClick} className="btn btn-primary mt-3">
                Thêm đơn vị
            </Button>
        </>
    );
}

export default AddUnit;
