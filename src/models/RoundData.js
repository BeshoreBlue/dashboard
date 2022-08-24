// Format data for charting
const RoundData = (data) => {
    if (!data) {
        return null;
    }

    const lapsData = data[0].MRData.RaceTable.Races[0]?.Laps;
    const pitstopData = data[1].MRData.RaceTable.Races[0]?.PitStops;
    const resultsData = data[2].MRData.RaceTable.Races[0];

    /* Race hasn't run yet or all data missing.
    Return round so Header can show correct race name */
    if (!lapsData && !pitstopData && !resultsData) {
        return { round: data[2].MRData.RaceTable.round || 1 }
    }

    // Data for position and lap time plots
    const getDriverData = () => {
        /* Create entries with starting grid position for each starting driver
        Grid position could be 0 if driver didn't start or started from pitlane */
        const driverData = resultsData.Results.map(driver => {
            const grid = driver.grid < 1 ? null : driver.grid;
            return {
                driver: driver.Driver.driverId, time: [null], position: [grid]
            }
        })
        /* For each driver, add time and position for each lap
         Data only exists where driver finished at least one lap */
        lapsData?.forEach((lap) => {
            lap.Timings.forEach((driver) => {
                const entry = driverData.find(entry => entry.driver === driver.driverId);
                entry?.time.push(driver.time);
                entry?.position.push(driver.position)
            })
        })
        return driverData;
    }

    // Data for pitstop and results tables
    const getResultsData = () => {
        const results = resultsData.Results;
        /* Add pitstops to results so pitstop table can include finishing position
        Pitstops could be null if driver didn't start or finish */
        pitstopData.forEach(pitstop => {
            const driverEntry = results.find(entry => entry.Driver.driverId === pitstop.driverId)
            driverEntry?.pitstops
                ? driverEntry.pitstops.push({ lap: pitstop.lap, duration: pitstop.duration })
                : driverEntry.pitstops = [{ lap: pitstop.lap, duration: pitstop.duration }];
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