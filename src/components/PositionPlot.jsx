import Card from "react-bootstrap/Card";
import Plot from "react-plotly.js";

const PositionPlot = ({ data }) => {

    const positionByLapData = data?.map(driver => {
        return {
            x: [...Array(driver.position.length).keys()],
            y: driver.position,
            text: driver.time,
            type: 'scatter',
            mode: 'lines',
            name: driver.driver
        }
    })

    return (
        <Card id="dash-card">
            <Card.Header>Driver position by lap</Card.Header>
            <Card.Body>
                <Plot
                    data={positionByLapData}
                    layout={{
                        autosize: true,
                        xaxis: {
                            title: 'Lap'
                        },
                        yaxis: {
                            autorange: 'reversed',
                            title: 'Position',
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

export default PositionPlot;