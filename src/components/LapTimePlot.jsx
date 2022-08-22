import Card from "react-bootstrap/Card";
import Plot from "react-plotly.js";

const LapTimePlot = ({ roundData }) => {

    const lapTimeByLapData = roundData?.driverData.map(driver => {
        return {
            x: [...Array(driver.time.length).keys()],
            y: driver.time.map(time => '2020-01-08 00:0' + time),
            text: driver.position,
            type: 'scatter',
            mode: 'lines',
            name: driver.driver
        }
    })

    return (
        <Card id="dash-card">
            <Card.Header>Driver laptime by lap</Card.Header>
            <Card.Body>
                <Plot
                    data={lapTimeByLapData}
                    layout={{
                        autosize: true,

                        xaxis: {
                            title: 'Lap'
                        },
                        yaxis: {
                            autorange: 'reversed',
                            tickformat: '%M:%S.%L',
                            title: 'Laptime',
                        },
                    }}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}
                    useResizeHandler={true}
                />
            </Card.Body>
        </Card>
    )
};

export default LapTimePlot;