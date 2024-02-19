import { useState, useEffect } from 'react';
import CardGroup from './components/CardGroup';
import Search from './components/Search'; // Assuming the path is correct

interface Employee {
  city: string;
  department: string;
  employee_id: number;
  first_name: string;
  hire_date: string;
  last_name: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    let apiUrl = 'http://127.0.0.1:5000/api/data';
    if (searchTerm) {
      apiUrl += `/${searchTerm}`;
    }
    apiUrl += `?page=${page}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Employee[]) => {
        setEmployees(data);
      })
      .catch(() => {
        alert('Nothing found');
      });
  }, [searchTerm, page]);

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setPage(1); // Reset page to 1 when search term changes
  };

  const nextPage = () => {
    fetch(`http://127.0.0.1:5000/api/data?page=${page + 1}&city=${searchTerm}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: Employee[]) => {
        if (data.length > 0) {
          setPage(prevPage => prevPage + 1);
        } else {
          alert('No more data available.');
        }
      })
      .catch(() => {
        alert('No more data available.');
      });
  };
  

  const prevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='flex text-center justify-center flex-col'>
      <h1 className="text-3xl font-bold underline pb-5">MySQL Data Fetcher</h1>
      <Search onSearch={handleSearch} />
      <CardGroup employees={employees} />
      <div className="flex flex-row justify-center justify-between pt-4">
        <button onClick={prevPage} disabled={page === 1}>Prev Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div></div>
  );
}

export default App;
