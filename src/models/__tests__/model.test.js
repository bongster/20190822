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
    await Promise.all(res.map(person => {
        expect(person instanceof StarShip).toBe(true);
        expect(person).toHaveProperty('model');
        expect(person).toHaveProperty('startship_class');
        expect(person).toHaveProperty('hyperdrive_rating');
        expect(person).toHaveProperty('cost_in_credits');
        expect(person).toHaveProperty('manufacturer');
    }));
});

test('getPlanets return response', async () => {
    const res = await getPlanets();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        expect(person instanceof Planet).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('population');
        expect(person).toHaveProperty('climate');
    }));
});

test('getVehicles return response', async () => {
    const res = await getVehicles();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        expect(person instanceof Vehicle).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('model');
        expect(person).toHaveProperty('cost_in_credits');
    }));
});