import './styles/App.css';
import {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard";
import Menu from "./components/Menu";
import Header from "./components/Header";

function App() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [round, setRound] = useState('last');
    const [season, setSeason] = useState(null);

    // Get data for season race selectors
    useEffect( () => {
        async function fetchData() {
            setLoading(true);
            return await fetch('http://ergast.com/api/f1/current.json')
                .then((res) => res.json())
        }
        fetchData().then(res => setSeason(res))
        setLoading(false)
    }, [])

  return (
        <div className="App">
            <Header season={season} round={round}/>
            <div className="Container">
                <Menu onClick={(round) => {setRound(round)}} season={season}/>
                <Dashboard round={round}/>
            </div>
        </div>
  );
}

export default App;
