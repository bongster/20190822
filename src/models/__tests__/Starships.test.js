import axios from 'axios';
import { getStarShips } from '../../models';
import StarShip from '../StarShip';

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

test('getStarShips return response', async () => {
    const starships = await getStarShips();
    expect(Array.isArray(starships)).toBe(true);
    await Promise.all(starships.map(starship => {
        expect(starship instanceof StarShip).toBe(true);
        expect(starship).toHaveProperty('name');
        expect(starship).toHaveProperty('model');
        expect(starship).toHaveProperty('starship_class');
        expect(starship).toHaveProperty('hyperdrive_rating');
        expect(starship).toHaveProperty('cost_in_credits');
        expect(starship).toHaveProperty('manufacturer');

        expect(starship.name).not.toBeNull();
        expect(starship.model).not.toBeNull();
        expect(starship.starship_class).not.toBeNull();
        expect(starship.hyperdrive_rating).not.toBeNull();
        expect(starship.cost_in_credits).not.toBeNull();
        expect(starship.manufacturer).not.toBeNull();
    }));
});

test('getStarShips:name return filtered response', async () => {
    const name = 'Executor';
    const starships = await getStarShips(name);
    expect(Array.isArray(starships)).toBe(true);
    expect(starships.length).toEqual(1);
    const starship = starships[0];
    expect(starship.name).toBe(name);
});
