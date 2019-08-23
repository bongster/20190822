import Person from './Person';
import StarShip from './StarShip';
import Vehicle from './Vehicle';
import Planet from './Planet';

export const getPerson = async (name) => {
    return await Person.getItems(name);
}

export const getStarShips = async (name) => {
    return await StarShip.getItems(name);
}

export const getPlanets = async (name) => {
    return await Planet.getItems(name);
}

export const getVehicles = async (name) => {
    return await Vehicle.getItems(name);
}

export default {
    Person: Person,
    StarShip: StarShip,
    Planet: Planet,
    Vehicle: Vehicle,
}