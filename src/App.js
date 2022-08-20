import './App.css';
import Plot from 'react-plotly.js';
import {useEffect, useState} from "react";
import formatData from "./formatData";

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [round, setRound] = useState('last');

  useEffect( () => {
      const urls = [
          `https://ergast.com/api/f1/current/${round}/laps.json?limit=2500`,
          `https://ergast.com/api/f1/current/${round}/pitstops.json?limit=100`,
          `https://ergast.com/api/f1/current/${round}/results.json`
      ];
      async function fetchData() {
          setLoading(true);
          const results = await Promise.all(
              urls.map((url) => fetch(url).then((res) => res.json()))
          )
          return results;
      }
      fetchData().then(res => setData(formatData(res)));
      setLoading(false)
  }, [round])

    const positionByLapData = data.map(driver => {
        return {
            x: [...Array(driver.position.length).keys()],
            y: driver.position,
            text: driver.time,
            type: 'scatter',
            mode: 'lines',
            name: driver.driver
        }
    })

    const lapTimeByLapData = data.map(driver => {
        return {
            x: [...Array(driver.time.length).keys()],
            y: driver.time.map(time => '2020-01-08 00:0' + time),
            text: driver.position,
            type: 'scatter',
            mode: 'lines',
            name: driver.driver
        }
    })

  return (
    <div className="App">
        <button>Hungary (round 13)</button>
        <Plot
            data={positionByLapData}
            layout={{
                width: 1500,
                height: 750,
                title: 'Driver position by lap',
                xaxis: {
                    title: 'Lap'
                },
                yaxis: {
                    autorange: 'reversed',
                    title: 'Position',
                },
            }}
        />
        <Plot
            data={lapTimeByLapData}
            layout={{
                width: 1500,
                height: 750,
                title: 'Driver laptime by lap',
                xaxis: {
                    title: 'Lap'
                },
                yaxis: {
                    autorange: 'reversed',
                    tickformat: '%M:%S.%L',
                    title: 'Laptime',
                },
            }}
        />
        <table>
            <tr>
                <th>Position</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th>Position change</th>
                <th>Laps</th>
                <th>Time</th>
            </tr>
            <tr>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
            </tr>
        </table>
    </div>
  );
}

export default App;
