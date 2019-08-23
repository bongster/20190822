import axios from 'axios';
import Cache from './Cache';

const API = 'https://swapi.co/api/';
class Model {
    static async getItems(param) {
        const url = `${API}${this.model_name}${param ? `?search=${param}` : ''}`;
        const cached = await Cache.get(url);
        let data;
        if (cached) {
            const parsedCache = JSON.parse(cached);
            data = parsedCache.results;
        } else {
            const res = await axios.get(url);
            data = res.data.results;
            await Cache.set(url, JSON.stringify(res.data));
        }

        if (param) {
            data = data.filter(d => d.name.includes(param));
        }

        return await Promise.all(data.map(async properties => {
            const c = await this.build(properties);
            return c;
        }));
    }

    static async getItem(url) {
        const cached = await Cache.get(url);
        let data;
        if (cached) {
            const parsedCache = JSON.parse(cached);
            data = parsedCache;
        } else {
            const res = await axios.get(url);
            data = res.data;
            await Cache.set(url, JSON.stringify(data));
        }

        const item = this.build(data);
        return item;
    }
}

export default Model;