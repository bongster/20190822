import axios from 'axios';

import Cache from './Cache';

const API = 'https://swapi.co/api/';

class Model extends Cache {
    async buildHasMany (model, list) {
        return await Promise.all(list.map(properties => new model(properties)));
    }

    async buildBelongsto(model, properties) {
        return await new model(properties);
    }

    build(targetClass, properties) {
        this.key = properties[targetClass.primary];
        targetClass.fields.map(({ key, model, hasMany, belongsTo }) => {
            this[key] = properties[key];
        });
    }

    static async getItems(param) {
        const data = super.getItems(param);
        if (data.length) {
            console.log(`${this.model_name} data got from cache`);
            return Promise.resolve(data);
        };

        const url = `${API}${this.model_name}${param ? `?search=${param}` : ''}`;
        const res = await axios.get(url);

        return await Promise.all(res.data.results.map(async properties => {
            const item = await this.build(properties);
            this.cachedData[this.model_name].add(item);
            this.hashTable[item.key] = item;
            return item;
        }));
    }

    static async getItem(url) {
        const cacheData = super.getItem(url);
        if (cacheData) {
            return Promise.resolve(cacheData);
        }
        const res = await axios.get(url);
        const item = await this.build(res.data);
        this.cachedData[this.model_name].add(item);
        this.hashTable[item.key] = item;
        return Promise.resolve(res.data);
    }
}

export default Model;