# Dashboard

Dashboard that visualises an F1 season's race data from https://ergast.com/mrd/. \
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

All plots are interactive:
- Click on legend items to toggle the lines on and off
- Double-click on a legend item to show only that line
- Click and drag to zoom

## Get code
```zsh
$ git clone git@github.com:BeshoreBlue/dashboard.git
```

## Run dev mode

```zsh
$ cd dashboard
$ npm install
$ npm start
```
Runs at [http://localhost:3000](http://localhost:3000)

## Run dev mode in a Docker container

```zsh
$ docker-compose up --build
```
Runs at [http://localhost:3000](http://localhost:3000)

## Run unit tests
### `npm test`
Press a to run all tests

## Known issues
- Windows scrollbar causes misalignment of table headers (no issue on Mac)

## Next steps
- Unit tests for Dashboard.jsx and related components
- Toggleable team and/or driver results on tables
- Toggleable pitstops and fastest laps on plots
- Data over season plots eg. driver finishing position vs round