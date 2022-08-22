import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card";

const PitstopsTable = ({ data }) => {

    const resultsBody = data?.map(driver => {
        const pitstopTimes = driver.pitstops?.map(stop => {
            return (
                <>
                    {`${stop.lap}, ${stop.duration}`}
                    <br></br>
                </>
            )
        })
        return (
            <tr>
                <td>{driver.position}</td>
                <td>{driver.Driver.code}</td>
                <td>{driver.pitstops?.length}</td>
                <td>{pitstopTimes}</td>
            </tr>
        )
    })

    return (
        <Card id="dash-card">
            <Card.Header>Pitstops</Card.Header>
            <Card.Body>
                <Table striped bordered hover size="sm" className="Data-table">
                    <thead>
                    <tr>
                        <th>Finished</th>
                        <th>Driver</th>
                        <th>Stops</th>
                        <th>Lap, duration</th>
                    </tr>
                    </thead>
                    <tbody className="Scroll-body">
                    {resultsBody}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
};

export default PitstopsTable;