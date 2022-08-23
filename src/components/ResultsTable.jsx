import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card";

const ResultsTable = ({ data }) => {
    if (!data) {
        return null;
    }

    const resultsBody = data.map(driver => {
        return (
            <tr>
                <td>{driver.position}</td>
                <td>{driver.Driver.code}</td>
                <td>{driver.laps}</td>
                <td>{driver.Time?.time || driver.status}</td>
                <td>{driver.grid}</td>
                <td>{driver.grid - driver.position}</td>
            </tr>
        )
    })

    return (
        <Card id="dash-card">
            <Card.Header>Race results</Card.Header>
            <Card.Body id="dash-card-content">
                <Table striped bordered hover size="sm" className="Data-table">
                    <thead>
                    <tr>
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