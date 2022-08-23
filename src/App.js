import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import RoundData from "./models/RoundData";

function App() {
    const [error, setError] = useState(null);
    const [appLoading, setAppLoading] = useState(false);
    const [roundLoading, setRoundLoading] = useState(false);
    const [round, setRound] = useState('last');
    const [season, setSeason] = useState(null);
    const [roundData, setRoundData] = useState(null);

    // Get races in a season
    useEffect( () => {
        async function fetchData() {
            setAppLoading(true);
            return await fetch('http://ergast.com/api/f1/current.json')
                .then((res) => res.json())
        }
        fetchData().then(res => setSeason(res))
        setAppLoading(false)
    }, [])

    // Get data for specified race
    useEffect( () => {
        const urls = [
            `https://ergast.com/api/f1/current/${round}/laps.json?limit=2500`,
            `https://ergast.com/api/f1/current/${round}/pitstops.json?limit=100`,
            `https://ergast.com/api/f1/current/${round}/results.json`
        ];
        async function fetchData() {
            setRoundLoading(true);
            const results = await Promise.all(
                urls.map((url) => fetch(url).then((res) => res.json()))
            )
            return results;
        }
        fetchData().then(res => setRoundData(RoundData(res)));
        setRoundLoading(false)
    }, [round])

    if (appLoading) {
        return (
                <div className="App">
                    <Spinner animation="border" variant="success" />
                </div>
        )
    }

  return (
        <div className="App">
            <Header
                season={season}
                round={round}
                roundData={roundData}
                onClick={(round) => {
                    setRound(round)
                }}
            />
            <Dashboard roundData={roundData} loading={roundLoading}/>
        </div>
  );
}

export default App;
