import fs from 'fs';

export class FileStorage {
    constructor(options = {}) {
        const { path = 'file.txt', delimiter = '$||$' } = options;
        this.storage = {};
        this.loaded = false;
        this.path = path;
        this.delimiter = delimiter;
        this.writeStream = fs.createWriteStream(path, {
            flags: 'a',
            encoding: 'utf-8',
        });
    }

    load() {
        return new Promise((resolve, reject) => {
            console.log(this.loaded);
            if (this.loaded) {
                return resolve();
            } else {
                const currentDateTimeStamp = new Date().getTime();
                fs.readFile(this.path, 'utf-8', (err, data) => {
                    return Promise.all(data.split('\n').filter(d => d).map(line => {
                        const [key, jsonData, expireDateTimeStamp] = line.split(this.delimiter);
                        if (currentDateTimeStamp < parseInt(expireDateTimeStamp)) {
                            this.storage[key] = jsonData;
                        }
                        this.loaded = true;
                    })).then(() => resolve(this.storage), reject);
                });
            }
        });
    }


    async get(key) {
        await this.load();
        return this.storage[key];
    }

    async set(key, data) {
        await this.load();
        const expireDate = new Date().getTime() + (1000 * 60 * 60 * 24 * 7);
        this.writeStream.write([
            key,
            data,
            expireDate,
        ].join('$||$') + '\n');
        this.storage[key] = data;
    }

    async clear() {
        await this.load();
        this.storage = {};
    }
}

export class MemoryStorage {
    constructor() {
        this.storage = {};
    }

    async get(key) {
        return this.storage[key];
    }

    async set(key, data) {
        this.storage[key] = data;
    }

    async clear() {
        this.storage = {};
    }
}

export class Cache {
    constructor(storage, options = {}) {
        this.storage = storage;
    }

    async get(key) {
        const res = await this.storage.get(key);
        console.log(`cached data: ${key}`);
        return res;
    }

    async set(key, data) {
        await this.storage.set(key, data);
        console.log(`saved data: ${key}`);
    }

    async clear() {
        await this.storage.clear();
    }

    async all() {
        return await this.storage.all();
    }
}

export default new Cache(new FileStorage());