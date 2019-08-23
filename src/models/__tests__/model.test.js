import axios from 'axios';
import { getPerson, getStarShips, getPlanets, getVehicles } from '../../models';
import Person from '../Person';
import StarShip from '../StarShip';
import Planet from '../Planet';
import Vehicle from '../Vehicle';

// jest.mock('axios');

// axios.get.mockImplementation((path) => {
//     console.log(path);
//     const model = path.split('?')[0].split('/').filter(x => x).pop();
//     let data = [];
//     if (path === 'https://swapi.co/api/planets/1/') {
//         return {
//             data: {
//                 "name": "Tatooine",
//                 "climate": "arid",
//                 "population": "200000",
//                 "url": "https://swapi.co/api/planets/1/"
//             }
//         }
//     } else if (path === 'https://swapi.co/api/starships/74/') {
//         return {
//             data: {
//                 "name": "Belbullab-22 starfighter",
//                 "model": "Belbullab-22 starfighter",
//                 "manufacturer": "Feethan Ottraw Scalable Assemblies",
//                 "cost_in_credits": "168000",
//                 "length": "6.71",
//                 "max_atmosphering_speed": "1100",
//                 "crew": "1",
//                 "passengers": "0",
//                 "cargo_capacity": "140",
//                 "consumables": "7 days",
//                 "hyperdrive_rating": "6",
//                 "MGLT": "unknown",
//                 "starship_class": "starfighter",
//                 "pilots": [
//                     "https://swapi.co/api/people/10/",
//                     "https://swapi.co/api/people/79/"
//                 ],
//                 "films": [
//                     "https://swapi.co/api/films/6/"
//                 ],
//                 "created": "2014-12-20T20:38:05.031000Z",
//                 "edited": "2014-12-22T17:35:45.381900Z",
//                 "url": "https://swapi.co/api/starships/74/"
//             }
//         }
//     }
//     switch (model) {
//         case 'people':
//             data = require('../__seed__/person.data').default;
//             break;
//         case 'starships':
//             data = require('../__seed__/starships.data').default;
//             break;
//         case 'planets':
//             data = require('../__seed__/planets.data').default;
//             break;
//         case 'vehicles':
//             data = require('../__seed__/vehicles.data').default;
//             break;
//         default:
//             break;
//     };
//     return {
//         data,
//     };
// });

// test('getPerson return response', async () => {
//     const res = await getPerson();
//     expect(Array.isArray(res)).toBe(true);
//     await Promise.all(res.map(person => {
//         expect(person instanceof Person).toBe(true);
//         expect(person).toHaveProperty('name');
//         expect(person).toHaveProperty('gender');
//         console.log(person.homeworld);
//         person.starships.forEach(startship => {
//             console.log(startship);
//             expect(startship instanceof StarShip).toBe(true);
//         });       
//     }));
// });

test('getPerson hasMany Planet test', async () => {
    Person.reset();
    const res = await getPerson();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        console.log(person.key);
        expect(person instanceof Person).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('gender');
        console.log(person);
        person.starships.forEach(startship => {
            console.log(startship);
            expect(startship instanceof StarShip).toBe(true);
        });
    }));
});


test('getPerson belongsTo Planet test', async () => {
    Person.reset();
    const res = await getPerson();
    expect(Array.isArray(res)).toBe(true);
    await Promise.all(res.map(person => {
        expect(person instanceof Person).toBe(true);
        expect(person).toHaveProperty('name');
        expect(person).toHaveProperty('gender');
        expect(person.homeworld instanceof Planet).toBe(true);
    }));
});

// test('getPerson return related model', async () => {
//     const res = await getPerson();
//     expect(Array.isArray(res)).toBe(true);
//     await Promise.all(res.map(person => {
//         expect(person instanceof Person).toBe(true);
//         expect(person).toHaveProperty('name');
//         expect(person).toHaveProperty('gender');
//         expect(person).toHaveProperty('starships');
//         person.starships.forEach(startship => {
//             expect(startship instanceof StarShip).toBe(true);
//         });
//     }));
// });

// test('getStartShip return response', async () => {
//     const res = await getStarShips();
//     expect(Array.isArray(res)).toBe(true);
//     await Promise.all(res.map(starship => {
//         expect(starship instanceof StarShip).toBe(true);
//         expect(starship).toHaveProperty('model');
//         expect(starship).toHaveProperty('starship_class');
//         expect(starship).toHaveProperty('hyperdrive_rating');
//         expect(starship).toHaveProperty('cost_in_credits');
//         expect(starship).toHaveProperty('manufacturer');
//     }));
// });

// test('getPlanets return response', async () => {
//     const res = await getPlanets();
//     expect(Array.isArray(res)).toBe(true);
//     await Promise.all(res.map(planet => {
//         expect(planet instanceof Planet).toBe(true);
//         expect(planet).toHaveProperty('name');
//         expect(planet).toHaveProperty('population');
//         expect(planet).toHaveProperty('climate');
//     }));
// });

// test('getVehicles return response', async () => {
//     const res = await getVehicles();
//     expect(Array.isArray(res)).toBe(true);
//     await Promise.all(res.map(vehicle => {
//         expect(vehicle instanceof Vehicle).toBe(true);
//         expect(vehicle).toHaveProperty('name');
//         expect(vehicle).toHaveProperty('model');
//         expect(vehicle).toHaveProperty('cost_in_credits');
//     }));
// });

// test('getVehicles from cache and return searched data', async () => {
//     const callCount = axios.get.mock.calls.length;
//     Vehicle.reset();
//     await getVehicles();
//     expect(axios.get.mock.calls.length).toBe(callCount + 1);
//     // TODO: this data from cache so don't call axios.get function
//     const name = 'Sand Crawler';
//     const res = await getVehicles(name);
//     expect(axios.get.mock.calls.length).toBe(callCount + 1);
//     expect(res).toHaveLength(1);
//     expect(res[0].name).toBe(name);
// });