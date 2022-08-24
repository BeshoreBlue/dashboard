import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import RoundData from "./models/RoundData";

function App() {
    const [appError, setAppError] = useState(null);
    const [appLoading, setAppLoading] = useState(false);
    const [season, setSeason] = useState(null);
    const [roundError, setRoundError] = useState(null);
    const [roundLoading, setRoundLoading] = useState(false);
    const [roundData, setRoundData] = useState(null);
    const [round, setRound] = useState('last');

    // Get races in current season
    useEffect( () => {
        setAppLoading(true);
        fetch('http://ergast.com/api/f1/current.json')
            .then((res) => res.json())
            .then(
                (data) => {
                    setAppLoading(false)
                    setSeason(data)
                },
                (error) => {
                    setAppLoading(false)
                    setAppError(error)
                })
    }, [])

    // Get data for specified race
    useEffect( () => {
        const urls = [
            `https://ergast.com/api/f1/current/${round}/laps.json?limit=2500`,
            `https://ergast.com/api/f1/current/${round}/pitstops.json?limit=100`,
            `https://ergast.com/api/f1/current/${round}/results.json`
        ];
        setRoundLoading(true);
        async function fetchData() {
            return await Promise.all(
                urls.map(url =>
                    fetch(url).then((res) => res.json())))
        }
        fetchData().then(
            (data) => {
                setRoundLoading(false)
                setRoundData(RoundData(data))
            },
            (error) => {
                setRoundLoading(false)
                setRoundError(error)
            })
    }, [round])

    if (appLoading) {
        return (
                <div className="App">
                    <div className="center-container">
                        <Spinner animation="border" variant="success" />
                    </div>
                </div>
        )
    }

    if (appError) {
        return (
            <div className="App">
                <div className="center-container">
                    Couldn't fetch data - {`${appError.name}: ${appError.message}`}
                </div>
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
            <Dashboard
                roundData={roundData}
                loading={roundLoading}
                error={roundError}
            />
        </div>
  );
}

export default App;
