class Planet {
    static fields = [
        'name', // Key
        'population',
        'climate',
    ]
    constructor(properties) {
        Planet.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default Planet;