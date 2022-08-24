import '../styles/Header.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = ({roundData, round, season, onClick}) => {
    const races = season?.MRData.RaceTable.Races;
    const year = season?.MRData.RaceTable.season;

    if (!races?.length) {
        return (
            <div className="dash-header">
                <div className="title-container">
                    No season data available
                </div>
            </div>
        )
    }

    // Dropdown items set which round to query for data
    const rounds = races.map(race => {
        /* Highlight current round in dropdown
        * Need to use roundData as round state could be string eg 'last' */
        if (race?.round === roundData?.round) {
            return (
                <Dropdown.Item id="menu-active-item" active key={race.round} onClick={() => {
                    onClick(race.round)
                }}>
                    {`${race.round}. ${race.raceName}`}
                </Dropdown.Item>)
        }
        return (
            <Dropdown.Item key={race.round} onClick={() => {
                onClick(race.round)
            }}>
                {`${race.round}. ${race.raceName}`}
            </Dropdown.Item>)
    })

    // As above, round could be string
    const getRoundName = () => {
        if (!round && !roundData) {
            return null;
        }
        if (round && !isNaN(round)) {
            return `${races[round - 1]?.raceName} - ${races[round - 1]?.Circuit.circuitName}`;
        }
        return `${roundData?.raceName} - ${roundData?.circuitName}`;
    }

    return (
        <div className="dash-header">
            <DropdownButton id="dropdown-button" title="Select round">
                {rounds}
            </DropdownButton>
            <div className="title-container">
                {`${year} ${getRoundName()}`}
            </div>
        </div>
    )
}

export default Header;