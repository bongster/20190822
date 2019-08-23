import axios from 'axios';

const API = 'https://swapi.co/api/';

class Cache {
    static cachedData = {};
    static hashTable = {};

    static convertSetToArray(data) {
        if (data instanceof Set) {
            return [...data];
        } else {
            return data;
        }
    }

    static init(force=false) {
        this.cachedData = this.cachedData || {};
        if (force) {
            this.cachedData[this.model_name] = new Set();
        } else {
            this.cachedData[this.model_name] = this.cachedData[this.model_name] || new Set();
        }
    }

    static getItems(param) {
        this.init();
        const cachedRes = this.cachedData[this.model_name];
        if (param) {
            const res = new Set();
            for (const i of cachedRes) {
                if (i.name.includes(param)) {
                    res.add(i);
                }
            }
            return this.convertSetToArray(res);
        } else {
            return this.convertSetToArray(this.cachedData[this.model_name]);
        }
    }

    static getItem(url) {
        this.init();
        return this.hashTable[url];
    }

    static reset() {
        this.init(true);
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
            const c = this.build(properties);
            this.cachedData[this.model_name].add(c);
            this.hashTable[c.key] = c;
            return c;
        });
    }

    static async getItem(url) {
        const cacheData = super.getItem(url);
        if (cacheData) {
            return cacheData;
        }
        const res = await axios.get(url);
        const item = this.build(res.data);
        this.cachedData[this.model_name].add(item);
        this.hashTable[item.key] = item;
        return res.data;
    }
}

export default Model;