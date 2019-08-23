import axios from 'axios';
import { getPerson } from '../../models';
import Person from '../Person';
import Planet from '../Planet';
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

test('getPerson return response', async () => {
    const res = await getPerson();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        expect(person instanceof Person).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('gender');
    }));
});

test('getPerson:name return filtered response', async () => {
    const name = 'Luke Skywalker';
    const res = await getPerson('Luke Skywalker');
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toEqual(1);
    const person = res[0];
    expect(person.name).toBe(name);
});

test('getPerson return associated belongsTo', async () => {
    const name = 'Luke Skywalker';
    const res = await getPerson(name);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toEqual(1);
    const person = res[0];
    expect(person.homeworld instanceof Planet).toBe(true);
});

test('getPerson return associated hasMany', async () => {
    const name = 'Luke Skywalker';
    const res = await getPerson(name);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toEqual(1);
    const person = res[0];
    expect(Array.isArray(person.starships)).toBe(true);
    const { starships } = person;
    await Promise.all(starships.map(starship => {
        expect(starship instanceof StarShip).toBe(true);
        expect(starship).toHaveProperty('model');
        expect(starship).toHaveProperty('starship_class');
        expect(starship).toHaveProperty('hyperdrive_rating');
        expect(starship).toHaveProperty('cost_in_credits');
        expect(starship).toHaveProperty('manufacturer');
    }));
});