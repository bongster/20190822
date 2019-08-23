import axios from 'axios';
import { getVehicles } from '../../models';
import Cache from '../Cache';

jest.mock('axios');

// Make sure to resolve with a promise
axios.get.mockImplementation((path) => {
    const model = path.split('?')[0].split('/').pop();
    let data = [];
    switch (model) {
        case 'people':
            data = require('../__seed__/person.data').default;
            break;
        case 'starships':
            data = require('../__seed__/starships.data').default;
            break;
        case 'planets':
            data = require('../__seed__/planets.data').default;
            break;
        case 'vehicles':
            data = require('../__seed__/vehicles.data').default;
            break;
        default:
            break;
    };
    return {
        data,
    };
});

test('get data from cache and return searched data', async () => {
    const callCount = axios.get.mock.calls.length;
    const name = 'Sand Crawler';
    Cache.clear();
    await getVehicles(name);
    expect(axios.get.mock.calls.length).toBe(callCount + 1);
    // TODO: this data from cache so don't call axios.get function
    const res = await getVehicles(name);
    expect(axios.get.mock.calls.length).toBe(callCount + 1);
    expect(res).toHaveLength(1);
    expect(res[0].name).toBe(name);
});