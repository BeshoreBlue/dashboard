const Header = ({ season }) => {
    const year = season?.MRData.RaceTable.season;

    return (
        <div className="Dash-header">
            {year}
        </div>
    )
}

export default Header;