import Plot from "react-plotly.js";
import {useEffect, useState} from "react";
import formatRoundData from "../models/formatRoundData";

const Dashboard = ({ round }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [roundData, setRoundData] = useState(null);

    // Get data for specified round
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
        fetchData().then(res => setRoundData(formatRoundData(res)));
        setLoading(false)
    }, [round])

    const positionByLapData = roundData?.driverData.map(driver => {
        return {
            x: [...Array(driver.position.length).keys()],
            y: driver.position,
            text: driver.time,
            type: 'scatter',
            mode: 'lines',
            name: driver.driver
        }
    })

    const lapTimeByLapData = roundData?.driverData.map(driver => {
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
        <div className="Dashboard">
            <Plot
                data={positionByLapData}
                layout={{
                    autosize: true,
                    title: 'Driver position by lap',
                    xaxis: {
                        title: 'Lap'
                    },
                    yaxis: {
                        autorange: 'reversed',
                        title: 'Position',
                    },
                }}
                style={{
                    height: '50%',
                    width: '80%'
                }}
                useResizeHandler={true}
            />
            <Plot
                data={lapTimeByLapData}
                layout={{
                    autosize: true,
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
                style={{
                    height: '50%',
                    width: '80%'
                }}
                useResizeHandler={true}
            />
        </div>
    )
};

export default Dashboard;