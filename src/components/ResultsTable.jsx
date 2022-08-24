import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card";

const ResultsTable = ({data}) => {
    if (!data) {
        return null;
    }

    const resultsBody = data.map(driver => {
        /* TODO - move grid and gained into RoundData
            so can use actual grid size instead of assuming 20 */

        // Driver.grid can be 0 if pitlane start
        const grid = driver.grid < 1 ? 'Pitlane' : driver.grid;
        const gained = () => {
            // Places gained from pitlane - 0 if no laps completed
            if (driver.grid < 1) {
                return driver.laps < 1 ? 0 : 20 - driver.position
            }
            return driver.grid - driver.position;
        }

        return (
            <tr key={`${driver.Driver.code}-results`}>
                <td>{driver.position}</td>
                <td>{driver.Driver.code}</td>
                <td>{driver.laps}</td>
                <td>{driver.Time?.time || driver.status}</td>
                <td>{grid}</td>
                <td>{gained()}</td>
            </tr>
        )
    })

    return (
        <Card id="dash-card">
            <Card.Header>Race results</Card.Header>
            <Card.Body>
                <Table striped bordered hover size="sm" className="data-table">
                    <thead>
                    <tr className="table-header">
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Laps</th>
                        <th>Time</th>
                        <th>Started</th>
                        <th>Gained</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resultsBody}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
};

export default ResultsTable;