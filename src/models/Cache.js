class Cache {
    static hashTable = {};

    static get(key) {
        const res = Cache.hashTable[key];
        console.log(`cached data: ${key}`);
        return res;
    }

    static set(key, data) {
        Cache.hashTable[key] = data;
        console.log(`saved data: ${key}`);
    }

    static clear() {
        Cache.hashTable = {};
    }

    static all() {
        return Cache.hashTable;
    }
}

export default Cache;