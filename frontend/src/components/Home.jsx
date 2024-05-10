import { useEffect, useState } from "react";
import Cards from "./Cards";

const Home = () => {

  const [bookStatus, setBookStatus] = useState([]);
  const [filter, setFilter] = useState("Show All");

useEffect(() => {
  const fetchIssuedBook = async () => {
    try {
      const url = 'http://localhost:4000/books/issued';
      console.log('Request URL:', url);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        setBookStatus(data); // Update state with parsed data
      } else {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  fetchIssuedBook();
}, [filter]);

  return (
    <div className='bg-secondary rounded-lg flex-grow px-4 py-10 items-stretch'>
      <div>
        <h1 className="text-4xl font-bold text-primary pb-6">
          Overview
        </h1>
      </div>
      <div>
        <div className="flex flex-row justify-between pb-3 pr-6 items-end">
          <div className="text-2xl font-semibold text-[#333333]">Issuer Details</div>
          <details className="dropdown dropdown-end flex flex-row gap-4 items-center ">
            <summary className="btn btn-ghost">
              <img src="https://img.icons8.com/ios-filled/50/4D4D4D/filter--v1.png" className="h-5" alt="filter--v1"/>
              <div className="font-semibold text-[#333333] text-xs">Filter</div>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-32">
              <div className="form-control" onClick={() => setFilter("Show All")}>
                <label className="label cursor-pointer">
                  <input type="radio" name="radio-10" className="radio radio-sm checked:bg-primary border-primary" checked onClick={() => setFilter("Show All")}/>
                  <span className="label-text text-left">Show All</span> 
                </label>
              </div>
              <div className="form-control" onClick={() => setFilter("Issued")}>
                <label className="label cursor-pointer" >
                  <input type="radio" name="radio-10" className="radio radio-sm checked:bg-primary border-primary" checked />
                  <span className="label-text text-left">Issued</span> 
                </label>
              </div>
              <div className="form-control" onClick={() => setFilter("Return")}>
                <label className="label cursor-pointer" >
                  <input type="radio" name="radio-10" className="radio radio-sm checked:bg-primary border-primary" checked />
                  <span className="label-tex text-leftt">Return</span> 
                </label>
              </div>
              <div className="form-control" onClick={() => setFilter("Overdue")}>
                <label className="label cursor-pointer" >
                  <input type="radio" name="radio-10" className="radio radio-sm checked:bg-primary border-primary" checked />
                  <span className="label- text-left">Overdue</span> 
                </label>
              </div>
            </ul>
          </details>
        </div>
        <div className="overflow-y-scroll pr-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="grid grid-cols-3 grid-flow-cols gap-4 items-stretch ">
              {bookStatus && bookStatus.map((book) => (
                <Cards key={book._id} book={book} filter={filter}/>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
