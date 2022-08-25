import {render, screen, fireEvent} from '@testing-library/react';
import Header from "../Header";
import CompleteRoundDataMock from "./mocks/CompleteRoundDataMock";
import SeasonMock from "./mocks/SeasonMock";

test('renders with correct initial race name and all races in a season', () => {
    render(<Header season={SeasonMock} round={3} roundData={CompleteRoundDataMock}/>);
    const title = screen.getByText('2022 Australian Grand Prix - Albert Park Grand Prix Circuit');
    expect(title).toBeTruthy();
    const button = screen.getByText('Select round')
    expect(button).toBeTruthy();
    fireEvent.click(button);
    const dropdownItems = screen.getAllByTestId('select-option')
    expect(dropdownItems.length).toBe(22);
    expect(dropdownItems.map(elem => elem.innerHTML)).toEqual([
        "1. Bahrain Grand Prix",
        "2. Saudi Arabian Grand Prix",
        "3. Australian Grand Prix",
        "4. Emilia Romagna Grand Prix",
        "5. Miami Grand Prix",
        "6. Spanish Grand Prix",
        "7. Monaco Grand Prix",
        "8. Azerbaijan Grand Prix",
        "9. Canadian Grand Prix",
        "10. British Grand Prix",
        "11. Austrian Grand Prix",
        "12. French Grand Prix",
        "13. Hungarian Grand Prix",
        "14. Belgian Grand Prix",
        "15. Dutch Grand Prix",
        "16. Italian Grand Prix",
        "17. Singapore Grand Prix",
        "18. Japanese Grand Prix",
        "19. United States Grand Prix",
        "20. Mexico City Grand Prix",
        "21. Brazilian Grand Prix",
        "22. Abu Dhabi Grand Prix",
    ])
});

test('renders when no data available', () => {
    render(<Header/>);
    const title = screen.getByText('No season data available');
    expect(title).toBeTruthy();
    const button = screen.queryByText('Select round')
    expect(button).toBeFalsy();
});

test('renders correct race name when round is a string', () => {
    render(<Header season={SeasonMock} round={'last'} roundData={CompleteRoundDataMock}/>);
    const title = screen.getByText('2022 Australian Grand Prix - Albert Park Grand Prix Circuit');
    expect(title).toBeTruthy();
    const button = screen.getByText('Select round')
    expect(button).toBeTruthy();
});

test('renders correct race name when no round data available', () => {
    render(<Header season={SeasonMock} round={19} roundData={{"round": "19"}}/>);
    const title = screen.getByText('2022 United States Grand Prix - Circuit of the Americas');
    expect(title).toBeTruthy();
    const button = screen.getByText('Select round')
    expect(button).toBeTruthy();
});