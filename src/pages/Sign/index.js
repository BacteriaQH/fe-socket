import './Sign.css';
import Title from '../../components/Title';
import ViewPDF from '../../components/ViewPDF';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import config from '../../config.json';
function Sign({ socket }) {
    const match = useParams();
    const [file, setFile] = useState('');
    const [url, setUrl] = useState('');
    const id = match.id;

    useEffect(() => {
        socket.emit('get file', id);
    }, []);
    socket.on('file with id', (data) => {
        setFile(data);
        setUrl(`${config.SERVER_URL}/${data.link}`);
    });

    return (
        <>
            <Title title={'Ký văn bản'} />
            {file ? (
                <div className="PDF-viewer" id="pdf-print">
                    <ViewPDF document={url} socket={socket} fileId={file.id} fileName={file.link} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Sign;
