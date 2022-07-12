import { useEffect, useRef, useState } from 'react';
import PSPDFKit from 'pspdfkit';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function ViewPDF({ document, socket, fileId, fileName }) {
    const redirect = useNavigate();
    const containerRef = useRef(null);
    const [blob, setBlob] = useState('');
    const [PDF, setPDF] = useState('');
    const [link, setLink] = useState('');
    const [data, setData] = useState();
    const uname = localStorage.getItem('name');
    useEffect(() => {
        const container = containerRef.current;
        const loadPDF = async () => {
            const instance = await PSPDFKit.load({
                container,
                document: document,
                baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            });
            return instance;
        };
        const nPDF = loadPDF();
        setPDF(nPDF);
        return () => PSPDFKit && PSPDFKit.unload(container);
    }, [document]);
    const arr = fileName.split('-');
    const filename = arr.pop();

    const handleClick = async () => {
        PDF.then((res) => res.exportPDF()).then(async (res) => {
            console.log(res);
            const blobP = await new Blob([res], { type: 'application/pdf' });
            setBlob(blobP);
            console.log(blob);
            socket.emit('write-chunk', blob, filename);
            console.log('emit');
            socket.on('file-name', (data) => {
                console.log(data);
                setLink(data);
                console.log(link);
            });
        });
    };

    const handleClickUpdate = () => {
        setData({
            id: fileId,
            isSign: true,
            signFileBy: uname,
            link: filename,
        });
        socket.emit('sign file', data);
    };
    socket.on('sign success', () => {
        redirect('/unit/list-file');
    });
    return (
        <>
            <Button onClick={handleClick} className="btn btn-primary mx-3">
                Lưu văn bản đã ký
            </Button>
            <Button onClick={handleClickUpdate} className="btn btn-primary mx-3">
                Cập nhật lên hệ thống
            </Button>
            <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
        </>
    );
}
export default ViewPDF;
