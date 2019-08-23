import axios from 'axios';

import fs from 'fs';
const API = 'https://swapi.co/api/';

export class FileStorage {
    static save(path, data) {
        // id, model_name, data, expired_date
        const expireDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 7);
        const stream = fs.createWriteStream(path);
        return Promise.all(Object.keys(data).map(modelName => {
            data[modelName].map(model => {
                // console.log(model.key, modelName, JSON.stringify(model), expireDate);
                stream.write([
                    model.key,
                    modelName,
                    JSON.stringify(model),
                    expireDate,
                ].join('$||$'));
                stream.write('\n');
            });
        })).then(c => {
            stream.end();
        });
    }

    static load(path) {
        return new Promise((resolve, reject) => {
            const res = {};
            fs.readFile(path, 'utf-8', (err, data) => {
                resolve(data.split('\n').filter(x => x).map(line => {
                    const separatedData = line.split('$||$');
                    return separatedData;
                }));
            });
        });
    }
}

class Cache extends FileStorage {
    static cachedData = {};
    static hashTable = {};

    static convertSetToArray(data) {
        if (data instanceof Set) {
            return [...data];
        } else {
            return data;
        }
    }

    static init(force = false) {
        this.cachedData = this.cachedData || {};
        if (force) {
            this.cachedData[this.model_name] = new Set();
        } else {
            this.cachedData[this.model_name] = this.cachedData[this.model_name] || new Set();
        }
    }

    static get(model_name, name) {
        return this.cachedData[model_name];
    }

    static set(key, item) {
        this.hashTable[key] = item;
    }

    static add(model_name, item) {
        this.cachedData[model_name].add(item);
    }

    static getItems(param) {
        this.init();
        const cachedRes = this.get(this.model_name);
        if (param) {
            const res = new Set();
            for (const i of cachedRes) {
                if (i.name.includes(param)) {
                    res.add(i);
                }
            }
            return this.convertSetToArray(res);
        } else {
            return this.convertSetToArray(cachedRes);
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
    static cache = Cache;

    static async getItems(param) {
        const data = super.getItems(param);
        if (data.length) {
            console.log(`${this.model_name} data got from cache`);
            return data;
        };

        const url = `${API}${this.model_name}${param ? `?search=${param}` : ''}`;
        const res = await axios.get(url);

        return res.data.results.map(properties => {
            const c = new this(properties);
            this.cache.add(this.model_name, c);
            this.cache.set(c.key, c);
            return c;
        });
    }

    static async getItem(url) {
        const cachedData = super.getItem(url);
        if (cachedData) {
            return cachedData;
        }
        const res = await axios.get(url);
        const item = new this(res.data);
        this.cache.add(this.model_name, c);
        this.cache.set(item.key, item);
        return res.data;
    }
}

export default Model;