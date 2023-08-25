import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:8085/events/projects`, { withCredentials: true });
    eventSource.onopen = (event) => {
      console.log(event.isTrusted);
    }
    eventSource.onerror = (event) => {
      console.log('SERVER EVENT ERROR');
    }
    eventSource.onmessage = (event) => {
      const project = JSON.parse(event.data);
      setData(project);
      console.log(project);
    }
    return () => eventSource.close();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <table className='table'>
            <thead>
              <tr className='text-white'>
                <th>Sales</th>
                <th>Customers</th>
                <th>Products</th>
                <th>Sellers</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-warning'>
                <td>{data.sales}</td>
                <td>{data.customers}</td>
                <td>{data.products}</td>
                <td>{data.sellers}</td>
              </tr>
            </tbody>
          </table>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
