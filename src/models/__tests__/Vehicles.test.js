import axios from 'axios';
import { getVehicles } from '../../models';
import Vehicle from '../Vehicle';

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
            data = {
                url: path,
                name: 'test name',
                gender: 'test gender',
                homeworld: null,
                vehicles: [],
                starships: [],
                model: 'test model',
                starship_class: 'test',
                hyperdrive_rating: 'test',
                cost_in_credits: 'test',
                manufacturer: 'test',
                population: 'test',
                climate: 'test',
                cost_in_credits: 'test',
            };
            break;
    };
    return {
        data,
    };
});

test('getVehicles return response', async () => {
    const vehicles = await getVehicles();
    expect(Array.isArray(vehicles)).toBe(true);
    await Promise.all(vehicles.map(vehicle => {
        expect(vehicle instanceof Vehicle).toBe(true);
        expect(vehicle).toHaveProperty('name');
        expect(vehicle).toHaveProperty('model');
        expect(vehicle).toHaveProperty('cost_in_credits');

        expect(vehicle.name).not.toBeNull();
        expect(vehicle.model).not.toBeNull();
        expect(vehicle.cost_in_credits).not.toBeNull();

    }));
});

test('getVehicles:name return filtered response', async () => {
    const name = 'Sand Crawler';
    const vehicles = await getVehicles(name);
    expect(Array.isArray(vehicles)).toBe(true);
    expect(vehicles.length).toEqual(1);
    const vehicle = vehicles[0];
    expect(vehicle.name).toBe(name);
});