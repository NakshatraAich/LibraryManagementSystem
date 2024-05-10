import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const PictureCapture = ({ onOcrResult }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [cameraEnabled, setCameraEnabled] = useState(false); // Track camera status

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    performOcr(imageSrc);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        performOcr(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const performOcr = async (imageSrc) => {
    try {
      const { data: { text } } = await Tesseract.recognize(imageSrc, 'eng', {
        logger: m => console.log(m)
      });
      const numbersOnly = text.replace(/\D/g, ''); // Remove non-digit characters
      setOcrResult(numbersOnly);
      onOcrResult(numbersOnly); // Sending OCR result to parent component
    } catch (error) {
      console.error('Error performing OCR:', error);
    }
  };

  const enableCamera = () => {
    setCameraEnabled(true);
  };

  return (
    <div className='h-full flex flex-col justify-center w-full items-center gap-4'>
      <div width={640} height={480} onClick={enableCamera} style={{ display: cameraEnabled ? 'none' : 'flex' }} className='flex flex-col gap-4 flex-grow border-2 border-neutral w-full bg-white rounded-3xl items-center justify-center'>
        <img width="200" height="200" src="https://img.icons8.com/ios/200/dbdbdb/camera--v4.png" alt="camera--v4"/>
        <p className='text-primary font-medium'>Press to Enable the camera</p>
      </div>
      {cameraEnabled && (
        <Webcam
          width={640} 
          height={400}
          className='flex flex-col gap-4 border-2 border-neutral rounded-xl'
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ display: capturedImage ? 'none' : 'block' }} // Hide webcam when image is captured
        />
      )}
      {capturedImage && (
        <div style={{ marginTop: '20px' }} width={640} height={400} className='flex flex-col gap-4 border-2 border-neutral rounded-xl grow stretch justify-center items-center w-full bg-white'>
          <h2>OCR Result:</h2>
          <pre>{ocrResult}</pre>
          <img src={capturedImage} alt="Captured" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>
      )}
      <div className='flex flex-row gap-4 '>
        <input type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} style={{ display: 'none' }} />
        <button onClick={captureFromWebcam} className='btn'>Capture Picture</button>
        <button onClick={() => fileInputRef.current.click()} className='btn'>Upload Image</button>
      </div>
    </div>
  );
};

export default PictureCapture;
