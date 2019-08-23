import { FileStorage } from '../Model';
import Person from '../Person';

// test('FileStorage save file to data', async () => {
//     const person = new Person({
//         url: 'http://test.com/1',
//         name: 'test',
//         gender: 'test',
//     });

//     FileStorage.save('cache.txt', {
//         people: Array(10).fill(null).map((d, i) => {
//             return new Person({
//                 url: `https://swapi.co/api/people/${i}`,
//                 name: 'test name ' + i,
//                 gender: 'test gender ' + i,
//             });
//         }),
//     })
// });

test('FileStorage load data from file', async () => {
    const d = await FileStorage.load('cache.txt');
    console.log(d);
})