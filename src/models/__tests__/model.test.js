import axios from 'axios';
import { getPerson, getStarShips, getPlanets, getVehicles } from '../../models';
import Person from '../Person';
import StarShip from '../StarShip';
import Planet from '../Planet';
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
            break;
    };
    return {
        data,
    };
});

test('getPerson return response', async () => {
    const res = await getPerson();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        expect(person instanceof Person).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('gender');
    }));
});

test('getStartShip return response', async () => {
    const res = await getStarShips();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(starship => {
        expect(starship instanceof StarShip).toBe(true);
        expect(starship).toHaveProperty('model');
        expect(starship).toHaveProperty('starship_class');
        expect(starship).toHaveProperty('hyperdrive_rating');
        expect(starship).toHaveProperty('cost_in_credits');
        expect(starship).toHaveProperty('manufacturer');
    }));
});

test('getPlanets return response', async () => {
    const res = await getPlanets();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(planet => {
        expect(planet instanceof Planet).toBe(true);
        expect(planet).toHaveProperty('name');
        expect(planet).toHaveProperty('population');
        expect(planet).toHaveProperty('climate');
    }));
});

test('getVehicles return response', async () => {
    const res = await getVehicles();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(vehicle => {
        expect(vehicle instanceof Vehicle).toBe(true);
        expect(vehicle).toHaveProperty('name');
        expect(vehicle).toHaveProperty('model');
        expect(vehicle).toHaveProperty('cost_in_credits');
    }));
});