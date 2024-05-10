/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const Cards = ({ book, filter }) => {
  const [status, setStatus] = useState(null);
  const [statusColor, setStatusColor] = useState(null);
  const [bgColor, setBgColor] = useState(null);

  // Function to format the date
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  // Function to add one month to the date
  const addOneMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate;
  };

  useEffect(() => {
    const returnDate = addOneMonth(book.lastIssuedDate);
    const currentDate = new Date();
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    if (currentDateWithoutTime > returnDate) {
      setStatus('Overdue');
      setStatusColor('text-[#FF3C3C]');
      setBgColor('bg-[#FF3C3C]');
    } else if (currentDateWithoutTime.getDate() === returnDate.getDate()) {
      setStatus('Return');
      setStatusColor('text-[#D3F600]');
      setBgColor('bg-[#D3F600]');
    } else {
      setStatus('Issued');
      setStatusColor('text-[#1DCE00]');
      setBgColor('bg-[#1DCE00]');
    }

  }, [book.lastIssuedDate]);

  return (
    <>
      { (filter === "Show All" || filter === status) &&
      <div className="flex flex-col border-2 border-neutral rounded-lg ">
        <div className="flex flex-col justify-between rounded-t-xl px-4 py-6 h-[250px] bg-white">
          <div className="text-xl font-semibold text-primary">{book.lastIssuedBy}</div>
          <div className="grid grid-cols-2 w-fit pb-12">
            <div className="text-xs text-[#666666]">Issued Book:</div>
            <div className="text-xs text-primary">{book.title}</div>
            <div className="text-xs text-[#666666]">ISBN Code:</div>
            <div className="text-xs text-primary">{book.isbn}</div>
            <div className="text-xs text-[#666666]">Date of Issue:</div>
            <div className="text-xs text-primary">{formatDate(book.lastIssuedDate)}</div>
            <div className="text-xs text-[#666666]">Date of Return:</div>
            <div className="text-xs text-primary">{formatDate(addOneMonth(book.lastIssuedDate))}</div>
          </div>
          <div className="text-lg font-semibold text-primary">Status : <span className={`text-lg font-semibold ${statusColor}`}>{status}</span></div>
        </div>
        <div className={`rounded-b-xl ${bgColor} h-2`}></div>
      </div>
      }
    </>
  );
};

export default Cards;
