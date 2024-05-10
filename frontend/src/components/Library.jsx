import { useEffect,useState } from "react";

const Library = () => {

  const [book, setBook] = useState([]);
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const url = 'http://localhost:4000/books/';
        console.log('Request URL:', url);
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          setBook(data); // Update state with parsed data
          console.log(data);
        } else {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchBook();
  }, []);

  
  return (
    <div className="bg-secondary rounded-lg flex-grow px-4 py-10 items-stretch">
      <div>
        <h1 className="text-4xl font-bold text-primary pb-6">
          Library Database
        </h1>
        <div className="overflow-y-scroll" style={{ maxHeight: "calc(100vh - 150px)"}}>
          <table className="table">
          <thead>
            <tr>
              <th>Title</th> 
              <th>ISBN Code</th> 
              <th>Genre</th> 
              <th>Row</th> 
              <th>Column</th> 
              <th>Shelf</th> 
              <th>Status</th>
            </tr>
          </thead> 
          <tbody>
            {book &&  book.map((onebook) =>(
              <tr key={book._id} className="text-left">
                <td>{onebook.title}</td>
                <td>{onebook.isbn}</td>
                <td>{onebook.genre}</td>
                <td>{onebook.row}</td>
                <td>{onebook.column}</td>
                <td>{onebook.shelf}</td>
                <td>{onebook.status}</td>
              </tr>))
            }
          </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Library