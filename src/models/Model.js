import axios from 'axios';

const API = 'https://swapi.co/api/';

class Cache {
    static cachedData = {};
    static hashTable = {};
    static getItems(param) {
        this.cachedData = this.cachedData || {};
        if (!this.cachedData[this.model_name]) {
            this.cachedData[this.model_name] = [];
        }
        const cachedRes = this.cachedData[this.model_name];
        if (param) {
            return cachedRes.filter(res => res['name'].includes(param))
        } else {
            return this.cachedData[this.model_name];
        }
    }

    static reset() {
        this.cachedData[this.model_name] = [];
    }
}

class Model extends Cache {
    static async getItems(param) {
        const data =super.getItems(param);
        if (data.length) {
            console.log(`${this.model_name} data got from cache`);
            return data;
        };

        const url = `${API}${this.model_name}${param ? `?search=${param}` : ''}`;
        const res = await axios.get(url);

        return res.data.results.map(properties => {
            const c = new this(properties);
            this.cachedData[this.model_name].push(c);
            this.hashTable[c.key] = c;
            return c;
        });
    }
}

export default Model;