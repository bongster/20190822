import axios from 'axios';

const API = 'https://swapi.co/api/';

class Model {
    static async getItems(param) {
        const url = `${API}${this.model_name}${param ? `?search=${param}` : ''}`;
        const res = await axios.get(url);
        const c = this;
        return res.data.results.map(properties => new c(properties));
    }
}

export default Model;