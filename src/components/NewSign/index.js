import React, { useEffect, useRef, useState } from 'react';
import './NewSign.css';

const NewSign = ({ sendSign }) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineColor, setLineColor] = useState('black');
    const [img, setImg] = useState(null);

    // Initialization when the component
    // mounts for the first time
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 1;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 5;
        ctxRef.current = ctx;
    }, [lineColor]);

    // Function for starting the drawing
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        setIsDrawing(true);
    };

    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing) {
            return;
        }
        ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

        ctxRef.current.stroke();
    };

    const handleExport = () => {
        const uri = canvasRef.current.toDataURL();
        setImg(uri);
        sendSign(uri);
    };
    return (
        <>
            <div className="draw-area">
                <div className="Menu">
                    <label>Brush Color </label>
                    <input
                        type="color"
                        onChange={(e) => {
                            setLineColor(e.target.value);
                        }}
                    />
                    <button onClick={handleExport}>Lưu chữ ký</button>
                </div>
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={endDrawing}
                    onMouseMove={draw}
                    ref={canvasRef}
                    width={`400px`}
                    height={`200px`}
                    style={{ border: 'solid' }}
                />
            </div>
        </>
    );
};

export default NewSign;
