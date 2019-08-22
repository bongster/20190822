import axios from 'axios';
import Person from './Person';
import StarShip from './StarShip';
import Vehicle from './Vehicle';
import Planet from './Planet';

const API = 'https://swapi.co/api/';

const getData = async (path, param) => {
    const url = `${API}${path}${param ? `?search=${param}`: ''}`;
    const res = await axios.get(url);
    return res.data.results;
}

export const getPerson = async (name) => {
    return (await getData('people', name)).map(properties => new Person(properties));
}

export const getStarShips = async (name) => {
    return (await getData('starships', name)).map(properties => new StarShip(properties));
}

export const getPlanets = async (name) => {
    return (await getData('planets', name)).map(properties => new Planet(properties));
}

export const getVehicles = async (name) => {
    return (await getData('vehicles', name)).map(properties => new Vehicle(properties));
}