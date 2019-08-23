import axios from 'axios';
import { getPlanets } from '../../models';
import Planet from '../Planet';

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

test('getPlanets return response', async () => {
    const plants = await getPlanets();
    expect(Array.isArray(plants)).toBe(true);
    await Promise.all(plants.map(planet => {
        expect(planet instanceof Planet).toBe(true);
        expect(planet).toHaveProperty('name');
        expect(planet).toHaveProperty('population');
        expect(planet).toHaveProperty('climate');
    }));
});

test('getPlanets:name return filtered response', async () => {
    const name = 'Alderaan';
    const plants = await getPlanets(name);
    expect(Array.isArray(plants)).toBe(true);
    expect(plants.length).toEqual(1);
    const planet = plants[0];
    expect(planet.name).toBe(name);
});
