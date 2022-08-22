// Format data for charting
const formatRoundData = (data) => {
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
                driver: driver.driverId, time: [], position: [], pitstops: []
            }
        })
        // add time and position for each lap
        lapsData.map((lap) => {
            lap.Timings.map((driver) => {
                const entry = driverData.find(entry => entry.driver === driver.driverId);
                entry.time.push(driver.time);
                entry.position.push(driver.position)
            })
        })
        // add pitstop laps and durations
        pitstopData.map(pitstop => {
            const entry = driverData.find(entry => entry.driver === pitstop.driverId);
            entry.pitstops.push({ lap: pitstop.lap, duration: pitstop.duration })
        })
        // add fastest laps
        resultsData.Results.map(driver => {
            const entry = driverData.find(entry => entry.driver === driver.Driver.driverId);
            entry.fastest = { time: driver.FastestLap.Time.time, lap:  driver.FastestLap.lap}
        })

        return driverData;
    }

     return {
            circuitName: resultsData.Circuit.circuitName,
            driverData: getDriverData(),
            raceName: resultsData.raceName,
            results: resultsData.Results,
            round: resultsData.round
        };
};

export default formatRoundData;