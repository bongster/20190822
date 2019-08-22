class Person {
    constructor(properties) {
        Object.keys(properties).map(key => {
            this[key] = properties[key];
        });
    }
}

export default Person;