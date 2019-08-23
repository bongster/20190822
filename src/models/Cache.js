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

    static init(force = false) {
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

export default Cache;