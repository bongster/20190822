class Vehicle {
    static fields = [
        'name', // Key
        'model',
        'cost_in_credits',
    ]
    constructor(properties) {
        Vehicle.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default Vehicle;