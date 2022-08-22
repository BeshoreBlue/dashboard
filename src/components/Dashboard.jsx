import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PositionPlot from "./PositionPlot";
import LapTimePlot from "./LapTimePlot";

const Dashboard = ({ roundData }) => {

    return (
        <div className="Dashboard">
            <Row xs={1} className="g-4">
                <Col>
                    <LapTimePlot roundData={roundData} />
                    <PositionPlot roundData={roundData}/>
                </Col>
                <Col>

                </Col>
            </Row>
        </div>
    )
};

export default Dashboard;