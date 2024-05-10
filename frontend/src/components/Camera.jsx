import { useState, useEffect } from "react"
import PictureCapture from "./PictureCapture";

const Camera = () => {

  const [status, setStatus] = useState(' ');
  const [ocrText, setOcrText] = useState(' ');
  const [issueToast, setIssueToast] = useState('translate-y-32');
  const [returnToast, setReturnToast] = useState('translate-y-32');

  const handleOcrResult = (text) => {
    setOcrText(text);
  }

  const issueBook = async (isbn, name, email) => {
    try {
      const url = 'http://localhost:4000/books/issue';
      console.log('Request URL:', url);

      const requestData = {
        isbn: isbn,
        name: name,
        email: email
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (response.ok) {
        const data = await response.json(); 
        setStatus(data.status); 
        console.log(data);
        issToast();
      } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const returnBook = async (isbn) => {
    try {
      const url = 'http://localhost:4000/books/return';
      console.log('Request URL:', url);

      const requestData = {
        isbn: isbn,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (response.ok) {
        const data = await response.json(); 
        setStatus(data.status); 
        console.log(data);
        retToast();
      } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to show and hide toast
  const retToast = () => {
    setReturnToast('-translate-y-4');
    setTimeout(() => {
      setReturnToast('translate-y-32'); // Reset back to initial position after 3 seconds
    }, 1000);
  };

  // Function to show and hide toast
  const issToast = () => {
    setIssueToast('-translate-y-4');
    setTimeout(() => {
      setIssueToast('translate-y-32'); // Reset back to initial position after 3 seconds
    }, 1000);
  };

  return (
    <div className="bg-secondary rounded-lg flex-grow px-4 py-10 items-stretch">
      <div className="flex flex-col h-full">
        <h1 className="text-4xl font-bold text-primary pb-6">
          Issue/Return
        </h1>
        <div className="flex flex-row flex-grow items-stretch gap-4 justify-between">
          <div className="div1 flex flex-col flex-grow rounded-lg border-0 border-neutral px-4 py-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Enter the ISBN Code of the book?</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xl"
                value={ocrText} 
                onChange={(e) => setOcrText(e.target.value)} 
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Enter your name?</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xl" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Enter your email address?</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xl" />
            </label>
            <div className="flex flex-row gap-4">
              <div className="btn w-fit mt-16 px-6 btn-primary" onClick={() => (issueBook(ocrText))}>Issue</div>
              <div className="btn w-fit mt-16 px-6 btn-primary" onClick={() => (returnBook(ocrText))}>Return</div>
            </div>
            <div className="mt-4 text-3xl font-semibold">
              Status: {status}
            </div>
          </div>
          <div className="div2 flex flex-col flex-grow">
            <PictureCapture onOcrResult={handleOcrResult}/>
          </div> 
          <div className={`toast transition-all ease-in-out delay-150 ${issueToast}`}>
            <div className="alert alert-info bg-green-400 text-primary font-semibold px-8 text-center ">
              Book Issued
            </div>
          </div>
          <div className={`toast transition-all ease-in-out delay-150 ${returnToast}`}>
            <div className="alert alert-info bg-green-400 text-primary font-semibold px-8 text-center flex">
              Book Returned
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default Camera;
