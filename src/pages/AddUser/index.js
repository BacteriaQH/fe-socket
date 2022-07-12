import { useEffect, useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap';
import Title from '../../components/Title';

function AddUser({ socket }) {
    const [input, setInput] = useState('');
    const handleChangeSearch = (e) => {
        setInput(e.target.value);
    };
    useEffect(() => {
        console.log(input);
        socket.emit('search', input);
    }, [input]);
    const handleClick = () => {};
    return (
        <>
            <Title title="Thêm User" />
            <Row>
                <FormGroup as={Col}>
                    <FormControl type="text" onChange={handleChangeSearch} />
                </FormGroup>
                <FormGroup as={Col}>
                    {/* <FormLabel>Tìm kiếm</FormLabel> */}
                    <FormSelect></FormSelect>
                </FormGroup>
                <Button onClick={handleClick} className="btn btn-primary mt-3">
                    {' '}
                    Thêm User
                </Button>
            </Row>
        </>
    );
}

export default AddUser;
