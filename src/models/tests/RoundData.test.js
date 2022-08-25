import RoundData from "../RoundData";
import CompleteDataMock from "./mocks/CompleteDataMock";
import EmptyDataMock from "./mocks/EmptyDataMock";
import CompleteRoundDataMock from "../../components/tests/mocks/CompleteRoundDataMock";

test('returns correct data when race has run', () => {
    expect(RoundData(CompleteDataMock)).toEqual(CompleteRoundDataMock)
})

test("returns correct data when race hasn't run", () => {
    expect(RoundData(EmptyDataMock)).toEqual( {"round": "19"})
})


