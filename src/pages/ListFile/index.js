import { Table, Row, Col } from 'react-bootstrap';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
function ListFile({ socket }) {
    const [files, setFiles] = useState('');
    const isAdmin = localStorage.getItem('isAdmin');
    console.log(typeof isAdmin);
    useEffect(() => {
        socket.emit('list file');
    }, []);
    socket.on('file res', (data) => {
        setFiles(data);
    });
    console.log(files);
    return (
        <>
            <Title title={'Danh sách File'} />
            <Row>
                <Col></Col>
                <Col>
                    <Link to="/unit/add-file" className="btn btn-primary">
                        Thêm file
                    </Link>
                </Col>
            </Row>
            <Table striped style={{ minHeight: '200px', minWidth: '100px', overflowX: 'scroll' }}>
                <thead>
                    <tr>
                        <td>STT</td>
                        <td>Tên file</td>
                        <td>Ngày tạo</td>
                        <td>Người tạo</td>
                        <td>Đã ký</td>
                        <td>Ngày ký</td>
                        <td>Người ký</td>
                        <td>Ký</td>
                    </tr>
                </thead>
                <tbody>
                    {files ? (
                        files.map((file) => (
                            <tr key={file.id}>
                                <td>{file.id}</td>
                                <td>{file.name}</td>
                                <td>{file.createFileAt}</td>
                                <td>{file.createFileBy}</td>
                                <td>{file.isSign ? 'Y' : 'N'}</td>
                                <td>{file.signFileAt}</td>
                                <td>{file.signFileBy}</td>
                                <td>{isAdmin === '1' ? <Button to={`/sign/sign/${file.id}`}>Xem</Button> : <></>}</td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </Table>
        </>
    );
}

export default ListFile;
