import '../styles/Dashboard.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PositionPlot from "./PositionPlot";
import LapTimePlot from "./LapTimePlot";
import PitstopsTable from "./PitstopsTable";
import ResultsTable from "./ResultsTable";
import Spinner from "react-bootstrap/Spinner";

// TODO - see if plot and table components can be more generalised
const Dashboard = ({roundData, error, loading}) => {
    if (loading) {
        return (
            <div className="center-container">
                <Spinner animation="border" variant="success"/>
            </div>
        )
    }

    if (error) {
        return (
            <div className="center-container">
                Couldn't fetch data - {`${error.name}: ${error.message}`}
            </div>
        )
    }

    if (!roundData || !(roundData?.driverData && roundData?.results)) {
        return (
            <div className="center-container">
                No race data available yet
            </div>
        )
    }

    return (
        <div className="dashboard">
            <Row lg={1} xl={2} className="g-4">
                <Col xl={7}>
                    {roundData?.driverData &&
                    <>
                        <LapTimePlot data={roundData.driverData}/>
                        <PositionPlot data={roundData.driverData}/>
                    </>
                    }
                </Col>
                <Col xl={5}>
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