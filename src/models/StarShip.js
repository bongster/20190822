class StarShip {
    static fields = [
        'name', // Key
        'model',
        'starship_class',
        'hyperdrive_rating',
        'cost_in_credits',
        'manufacturer',
    ]
    constructor(properties) {
        StarShip.fields.map(field => {
            this[field] = properties[field];
        });
    }
}

export default StarShip;