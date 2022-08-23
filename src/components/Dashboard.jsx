import '../styles/Dashboard.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PositionPlot from "./PositionPlot";
import LapTimePlot from "./LapTimePlot";
import PitstopsTable from "./PitstopsTable";
import ResultsTable from "./ResultsTable";
import Spinner from "react-bootstrap/Spinner";

// TODO - generalise plot and table components
const Dashboard = ({ roundData, loading }) => {
    if (loading) {
        return (
            <div className="dashboard">
                <div className="center-container">
                    <Spinner animation="border" variant="success" />
                </div>
            </div>
        )
    }

    if (!roundData || !(roundData?.driverData && roundData?.results)) {
        return (
            <div className="dashboard">
                <div className="center-container">
                    No race data available yet
                </div>
            </div>
        )
    }
    return (
        <div className="dashboard">
            <Row lg={1} xl={2} className="g-4">
                <Col xl={8}>
                    {roundData?.driverData &&
                        <>
                            <LapTimePlot data={roundData.driverData} />
                            <PositionPlot data={roundData.driverData}/>
                        </>
                    }
                </Col>
                <Col xl={4}>
                    {roundData?.results &&
                        <>
                            <PitstopsTable data={roundData.results}/>
                            <ResultsTable data={roundData.results}/>
                        </>
                    }
                </Col>
            </Row>
        </div>
    )
};

export default Dashboard;