// Format data for charting
const RoundData = (data) => {
    if (!data) {
        return null;
    }

    const lapsData = data[0].MRData.RaceTable.Races[0]?.Laps;
    const pitstopData = data[1].MRData.RaceTable.Races[0]?.PitStops;
    const resultsData = data[2].MRData.RaceTable.Races[0];

    if (!lapsData && !pitstopData && !resultsData) {
        return { round: data[2].MRData.RaceTable.round || 1 }
    }

    const getDriverData = () => {
        // create entries for each starting driver
        const driverData = lapsData[0].Timings.map((driver) => {
            return {
                driver: driver.driverId, time: [null], position: []
            }
        })
        // add starting position
        resultsData.Results.map(driver => {
            const entry = driverData.find(entry => entry.driver === driver.Driver.driverId);
            entry.position.push(driver.grid)
        })
        // add time and position for each lap
        lapsData.map((lap) => {
            lap.Timings.map((driver) => {
                const entry = driverData.find(entry => entry.driver === driver.driverId);
                entry.time.push(driver.time);
                entry.position.push(driver.position)
            })
        })
        return driverData;
    }

    const getResultsData = () => {
        const results = resultsData.Results;

        // add pitstop laps and durations to results data
        pitstopData.map(pitstop => {
            const driverEntry = resultsData.Results.find(entry => entry.Driver.driverId === pitstop.driverId)
            driverEntry.pitstops ?
                driverEntry.pitstops.push({ lap: pitstop.lap, duration: pitstop.duration })
                : driverEntry.pitstops = [];
        })
        return results;
    }

     return {
            circuitName: resultsData.Circuit.circuitName,
            driverData: getDriverData(),
            raceName: resultsData.raceName,
            results: getResultsData(),
            round: resultsData.round,
        };
};

export default RoundData;