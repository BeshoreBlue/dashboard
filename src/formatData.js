const formatData = (data) => {
    const lapsData = data[0].MRData.RaceTable.Races[0].Laps;

    // create a new array with objects for each starting driver
    const driverData = lapsData[0].Timings.map((driver) => {
        return {
            driver: driver.driverId, time: [], position: []
        }
    })

    // then add time and position for each lap to each driver object
    lapsData.map((lap) => {
        lap.Timings.map((driver) => {
            const entry = driverData.find(entry => entry.driver === driver.driverId);
            entry.time.push(driver.time);
            entry.position.push(driver.position)
        })
    })

     return driverData;
};

export default formatData;