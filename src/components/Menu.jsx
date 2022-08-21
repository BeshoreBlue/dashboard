
const Menu = ({ onClick, season }) => {

    const roundButtons = season?.MRData.RaceTable.Races.map(race => {
        return <button className="Menu-button" onClick={() => onClick(race.round)}>{`${race.round}. ${race.raceName}`}</button>
    })

    return(
        <div className="Button-container">
            {roundButtons}
        </div>
    )
}

export default Menu;