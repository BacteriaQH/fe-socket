import { Tab, Tabs, FormGroup, Col, FormLabel, FormSelect, FormControl, FormCheck, Row, Form } from 'react-bootstrap';
import html2canvas from 'html2canvas';

import Title from '../../components/Title';
import NewSign from '../../components/NewSign';
import { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
function AddSign({ data }) {
    const domRef = useRef(null);

    const [sign, setSign] = useState(null);
    const [sample, setSample] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [office, setOffice] = useState('');
    const [position, setPosition] = useState('');
    const [time, setTime] = useState('');
    const [show, setShow] = useState(0);
    const [showImg, setShowImg] = useState(true);
    const [showInfo, setShowInfo] = useState(true);

    const sendSign = (data) => {
        setSign(data);
    };
    const padVal = (number) => {
        return number < 10 ? '0' + number : number;
    };
    const timeToString = () => {
        let current = new Date();
        let sAMPM = 'AM';
        let y = current.getFullYear();
        let m = padVal(current.getMonth() + 1);
        let d = padVal(current.getDate());
        let h = current.getHours();
        let mn = padVal(current.getMinutes());
        let s = padVal(current.getSeconds());
        if (h > 12) {
            sAMPM = 'PM';
            h = h - 12;
        }
        return `${m}/${d}/${y} ${padVal(h)}:${mn}:${s} ${sAMPM}`;
    };
    const handleName = (e) => {
        if (e.target.checked) {
            setName('Văn Hoàng Phúc');
        } else {
            setName('');
        }
    };
    const handleEmail = (e) => {
        if (e.target.checked) {
            setEmail('vhp01@localhost.com');
        } else {
            setEmail('');
        }
    };
    const handleOffice = (e) => {
        if (e.target.checked) {
            setOffice('Học viện Kỹ thuật Mật mã');
        } else {
            setOffice('');
        }
    };
    const handlePosition = (e) => {
        if (e.target.checked) {
            setPosition('Sinh viên');
        } else {
            setPosition('');
        }
    };
    const handleTime = (e) => {
        if (e.target.checked) {
            const current = timeToString();
            setTime(current);
        } else {
            setTime('');
        }
    };
    const handleShow = (e) => {
        setShow(Number.parseInt(e.target.value));
    };
    useEffect(() => {
        if (show === 0) {
            setShowImg(true);
            setShowInfo(true);
        } else if (show === 1) {
            setShowImg(true);
            setShowInfo(false);
        } else {
            setShowImg(false);
            setShowInfo(true);
        }
    }, [show]);
    const handleDelete = () => {};

    const handleSample = async () => {
        html2canvas(domRef.current).then((canvas) => {
            console.log(canvas.toDataURL('img/png'));
            setSample(canvas.toDataURL('img/png'));
        });
    };
    return (
        <>
            <Title title="Tạo chữ ký mới" />
            <Tabs defaultActiveKey="sign" transition={true} className="mb-3">
                <Tab eventKey="sign" title="Tạo mới chữ ký">
                    <NewSign sendSign={sendSign} />
                </Tab>
                <Tab eventKey="new" title="Tạo mẫu chữ ký mới">
                    <Form>
                        <FormGroup as={Col}>
                            <FormLabel>Mẫu chữ ký</FormLabel>
                            <FormSelect name="bank">
                                <option value="0">Tạo mẫu chữ ký mới</option>
                            </FormSelect>
                        </FormGroup>
                        <FormGroup as={Col}>
                            <FormLabel>Tên mẫu chữ ký</FormLabel>
                            <FormControl type="text" placeholder="Nhập Tên mẫu chữ ký" name="sign_name" />
                        </FormGroup>
                        {<input type={'hidden'} value={sample} />}
                    </Form>
                    <Row className="mt-3">
                        <Col lg={9}>
                            <FormGroup>
                                <FormLabel>Hiển thị chữ ký</FormLabel>
                                <FormGroup as={Col}>
                                    <FormCheck
                                        name="sign_type"
                                        type={'radio'}
                                        id={'all'}
                                        label={'Thông tin và hình ảnh'}
                                        value={0}
                                        inline
                                        checked={show === 0}
                                        onChange={handleShow}
                                    />
                                    <FormCheck
                                        name="sign_type"
                                        type={'radio'}
                                        id={'image'}
                                        label={'Hình ảnh'}
                                        value={1}
                                        inline
                                        checked={show === 1}
                                        onChange={handleShow}
                                    />
                                    <FormCheck
                                        name="sign_type"
                                        type={'radio'}
                                        id={'info'}
                                        label={'Thông tin'}
                                        value={2}
                                        inline
                                        checked={show === 2}
                                        onChange={handleShow}
                                    />
                                </FormGroup>
                            </FormGroup>
                            <Row className="border" ref={domRef}>
                                {showImg && <Col>{sign && <img src={sign} alt="sign" />}</Col>}
                                {showInfo && (
                                    <Col className="mt-3">
                                        <Row>
                                            {name && (
                                                <p>
                                                    Người ký: <strong>{name}</strong>
                                                </p>
                                            )}
                                        </Row>
                                        <Row>
                                            {email && (
                                                <p>
                                                    Email: <strong>{email}</strong>
                                                </p>
                                            )}
                                        </Row>
                                        <Row>
                                            {office && (
                                                <p>
                                                    Cơ quan: <strong>{office}</strong>
                                                </p>
                                            )}
                                        </Row>
                                        <Row>
                                            {position && (
                                                <p>
                                                    Chức vụ: <strong>{position}</strong>
                                                </p>
                                            )}
                                        </Row>
                                        <Row>
                                            {time && (
                                                <p>
                                                    Thời gian: <strong>{time}</strong>
                                                </p>
                                            )}
                                        </Row>
                                    </Col>
                                )}
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <FormCheck label="Người ký" name="checkbox" onChange={handleName} />
                            <FormCheck label="Email" name="checkbox" onChange={handleEmail} />
                            <FormCheck label="Cơ quan" name="checkbox" onChange={handleOffice} />
                            <FormCheck label="Chức vụ" name="checkbox" onChange={handlePosition} />
                            <FormCheck label="Thời gian" name="checkbox" onChange={handleTime} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button onClick={handleDelete}>Xoá</Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <Button type="submit" onClick={handleSample}>
                                Lưu
                            </Button>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </>
    );
}

export default AddSign;
