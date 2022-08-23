import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Header = ({ roundData, round, season, onClick }) => {
    const races = season?.MRData.RaceTable.Races;
    const year = season?.MRData.RaceTable.season;

    // Dropdown items to set which round to query for data
    // Current round shown highlighted in dropdown
    const rounds = races?.map(race => {
        if (race?.round === roundData?.round) {
            return (
                <Dropdown.Item id="dropdown-menu-active-item" active key={race.round} onClick={() => {
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

    const getRoundName = () => {
        if (!round && !roundData) {
            return null;
        }
        if (round && !isNaN(round)) {
            console.log(races)
            return ` ${races[round - 1]?.raceName} - ${races[round - 1]?.Circuit.circuitName}`;
        }
        return ` ${roundData?.raceName} - ${roundData?.circuitName}`;
    }

    return (
        <div className="Dash-header">
            {rounds &&
                <DropdownButton id="dropdown-button" title="Select round">
                    {rounds}
                </DropdownButton>
            }
            <div className="Text-container">
                {year}
                {getRoundName()}
            </div>
        </div>
    )
}

export default Header;