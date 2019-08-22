class Person {
    static fields = [
        'name',
        'gender',
        'homeworld',
        'vehicles',
        'starships',
    ]
    constructor(properties) {
        Person.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default Person;