import axios from 'axios';
import Person from './Person';

const API = 'https://swapi.co/api/';

const getData = async (path, param) => {
    const url = `${API}${path}${param ? `?search=${param}`: ''}`;
    const res = await axios.get(url);
    return res.data.results;
}

export const getPerson = async (name) => {
    return (await getData('people', name)).map(properties => new Person(properties));
}
