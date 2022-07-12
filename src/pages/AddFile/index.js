import { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import config from '../../config.json';
function AddFile({ socket }) {
    const redirect = useNavigate();
    const name = localStorage.getItem('name');
    const [data, setData] = useState({
        code: '',
        name: '',
        createFileBy: name,
    });
    const [message, setMessage] = useState({
        err: false,
        mess: '',
    });
    const [destination, setDestination] = useState('');
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
    const handleChangeFileUpload = (e) => {
        const file = e.target.files[0];
        console.log(file);
        socket.emit('upload-file', file, file.name, file.lastModified);
    };
    useEffect(() => {
        setData({
            ...data,
            link: destination,
        });
    }, [destination]);
    const handleClick = () => {
        setData({
            ...data,
            link: destination,
        });
        console.log(data);
        socket.emit('add-file', data);
    };
    socket.on('upload-success', (data) => {
        setMessage({
            err: false,
            mess: 'Upload file thành công',
        });
        setDestination(data);
    });
    socket.on('upload-failure', (data) => {
        setMessage({
            err: true,
            mess: `Upload file không thành công. Lỗi: ${data}`,
        });
    });
    const handleNavigate = () => {
        redirect('/unit/list-file');
    };
    socket.on('Add file success', () => {
        setMessage({
            err: false,
            mess: 'Thêm file thành công. Chuyển trang sau 1s',
        });
        setTimeout(handleNavigate, 2000);
    });
    socket.on('add-file-fail', (data) => {
        setMessage({
            err: true,
            mess: `Thêm file không thành công. Lỗi: ${data}`,
        });
    });
    return (
        <>
            <Title title={'Thêm file'} />
            {message ? <div className={!message.err ? 'text-success' : 'text-danger'}>{message.mess}</div> : <></>}
            <Row>
                <FormGroup as={Col}>
                    <FormLabel>Code</FormLabel>
                    <FormControl type="text" name="code" placeholder="Nhập Code" onChange={handleChange} />
                </FormGroup>
                <FormGroup as={Col}>
                    <FormLabel>Tên văn bản</FormLabel>
                    <FormControl type="text" name="name" placeholder="Nhập Tên văn bản" onChange={handleChange} />
                </FormGroup>
            </Row>
            <FormGroup as={Col} className="mt-3">
                <FormControl type="file" accept="application/pdf" onChange={handleChangeFileUpload} />
            </FormGroup>
            {destination ? <div>{`${config.SERVER_URL}/${destination}`}</div> : <></>}
            <Button onClick={handleClick} className="btn btn-primary mt-3">
                Thêm file
            </Button>
        </>
    );
}

export default AddFile;
