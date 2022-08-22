import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from "react";

const Header = ({ roundData, season, onClick }) => {
    const [roundName, setRoundName] = useState(null);

    const races = season?.MRData.RaceTable.Races;
    const year = season?.MRData.RaceTable.season;

    // Dropdown items to set which round to query for data
    // Current round shown highlighted in dropdown
    const rounds = races?.map(race => {
        if (race?.round === roundData?.round) {
            return (
                <Dropdown.Item active onClick={() => {
                    onClick(race.round)
                    setRoundName(` ${race?.raceName} - ${race?.circuitName}`)
                }}>
                    {`${race.round}. ${race.raceName}`}
                </Dropdown.Item>)
        }
        return (
            <Dropdown.Item onClick={() => {
                onClick(race.round)
                setRoundName(` ${race?.raceName} - ${race?.circuitName}`)
            }}>
                {`${race.round}. ${race.raceName}`}
            </Dropdown.Item>)
    })

    return (
        <div className="Dash-header">
            <DropdownButton id="dropdown" title="Select round">
                {rounds}
            </DropdownButton>
            <div className="Text-container">
                {year}
                {roundName}
            </div>
        </div>
    )
}

export default Header;