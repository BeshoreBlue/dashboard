import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card";

const PitstopsTable = ({ data }) => {
    if (!data) {
        return null;
    }

    const resultsBody = data.map(driver => {
        const pitstopTimes = driver.pitstops?.map(stop => {
            return (
                <>
                    {`${stop.lap}, ${stop.duration}`}
                    <br/>
                </>
            )
        })
        return (
            <tr>
                <td>{driver.position}</td>
                <td>{driver.Driver?.code}</td>
                <td>{driver.pitstops?.length}</td>
                <td>{pitstopTimes}</td>
            </tr>
        )
    })

    return (
        <Card id="dash-card">
            <Card.Header>Pitstops</Card.Header>
            <Card.Body id="dash-card-content">
                <Table striped bordered hover size="sm" className="data-table">
                    <thead>
                    <tr className="table-header">
                        <th>Finished</th>
                        <th>Driver</th>
                        <th>Stops</th>
                        <th>Lap(s), duration</th>
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

export default PitstopsTable;