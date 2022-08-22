import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PositionPlot from "./PositionPlot";
import LapTimePlot from "./LapTimePlot";
import PitstopsTable from "./PitstopsTable";
import ResultsTable from "./ResultsTable";

const Dashboard = ({ roundData }) => {
    if (!roundData || !(roundData?.driverData && roundData?.results)) {
        return (
            <div className="Dashboard">
                No race data available!
            </div>
        )
    }
    return (
        <div className="Dashboard">
            <Row lg={1} xl={2} className="g-4">
                <Col xl={8}>
                    <LapTimePlot data={roundData?.driverData} />
                    <PositionPlot data={roundData?.driverData}/>
                </Col>
                <Col xl={4}>
                    <PitstopsTable data={roundData?.results}/>
                    <ResultsTable data={roundData?.results}/>
                </Col>
            </Row>
        </div>
    )
};

export default Dashboard;