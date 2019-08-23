import { getStarShips, getPlanets, getPerson, getVehicles } from './models';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const searchTypes = {
    people: getPerson,
    plants: getPlanets,
    starships: getStarShips,
    vehicles: getVehicles,
}
rl.question('Select searching type? [people, plants, startships, vehicles]\n', searchType => {
    if (Object.keys(searchTypes).indexOf(searchType) === -1) {
        throw new Error('have to selected correct type');
    };

    rl.question('Which name are looking for?\n', async param => {
        const answer = await searchTypes[searchType](param);
        console.log(answer);
        rl.close();
    })
});