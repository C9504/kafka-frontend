import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function App() {

  const [data, setData] = useState({});
  const [options, setOptions] = useState({});

  useEffect(() => {
    let id = window.location.pathname.replace("/", "");
    console.log(id);
    const eventSource = new EventSource(`http://localhost:8084/events/projects/${id}`, { withCredentials: true });
    eventSource.onopen = (event) => {
      console.log(event.isTrusted);
    }
    eventSource.onerror = (event) => {
      console.log('SERVER EVENT ERROR');
    }
    eventSource.onmessage = (event) => {
      let project = JSON.parse(event.data);
      project = JSON.parse(project.value);
      setData(project);
      setOptions({
        plotOptions: {
          series: {
            borderWidth: 0,
            colorByPoint: true,
            type: 'pie',
            size: '100%',
            innerSize: '80%',
            dataLabels: {
              enabled: true,
              crop: false,
              distance: '-10%',
              style: {
                fontWeight: 'bold',
                fontSize: '16px'
              },
              connectorWidth: 0
            }
          }
        },
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Events'
        },
        series: [
          {
            type: 'pie',
            data: [
              { name: 'Sales', y: Math.abs(project.sales) },
              { name: 'Customers', y: Math.abs(project.customers) },
              { name: 'Products', y: Math.abs(project.products) },
              { name: 'Sellers', y: Math.abs(project.sellers) },
              { name: 'Others', y: Math.abs(project.some) }
            ]
          }
        ]
      })
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
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              <tr className='text-warning'>
                <td>{data.sales}</td>
                <td>{data.customers}</td>
                <td>{data.products}</td>
                <td>{data.sellers}</td>
                <td>{data.some}</td>
              </tr>
            </tbody>
          </table>
        </p>
        <HighchartsReact highcharts={Highcharts} options={options} />
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
