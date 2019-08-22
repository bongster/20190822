import axios from 'axios';
import { getPerson } from '../../models';

jest.mock('axios');

// Make sure to resolve with a promise
axios.get.mockImplementation(() => {
    const PersonData = require('../__seed__/person.data').default;
    return {
        data: PersonData
    };
});

test('getPerson return response', async () => {
    const res = await getPerson('Luke Skywalker');
    console.log(res);
    expect(Array.isArray(res)).toBe(true);
});